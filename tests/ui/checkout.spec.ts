import { Logger } from '../../src/core/logger';
import { test, expect } from '@core/fixtures/fixtures';
import { loadSessionStorage } from '@utils/sessionStorage';

test.describe('Checkout critical flows', () => {
  test('should add item to cart', { tag: '@smoke' }, async ({ catalogPage, cartPage }) => {
    await catalogPage.navigate();

    await test.step('Add first product to cart', async () => {
      const firstProduct = await catalogPage.firstProduct();
      let selectedName = await firstProduct.getName();
      let selectedPrice = await firstProduct.getPrice();

      await test.step('Add first product to cart', async () => {
        await firstProduct.addToCart();
        //TODO: Fix a Logger class and log this action
        Logger.log(`Added product "${selectedName}" priced at ${selectedPrice} to the cart`);
      });

      await test.step('Validate cart contents', async () => {
        await catalogPage.openCart();
        //TODO: add logging to this step
        const items = await cartPage.getCartItems();
        expect(items.length).toBeGreaterThan(0);

        const item = items[0];
        const name = await item.getName();
        const price = await item.getPrice();
        const quantity = await item.getQuantity();
        const subtotal = await cartPage.getSubtotal();

        expect(name).toBe(selectedName);
        expect(price).toBe(selectedPrice);
        expect(quantity).toBe(1);
        expect(subtotal).toBe(selectedPrice);
      });
    });
  });

  test(
    'should complete checkout successfully',
    { tag: '@smoke' },
    async ({ page, catalogPage, cartPage, checkoutPage, confirmationPage }) => {
      await loadSessionStorage(page);
      await catalogPage.navigate();

      const firstProduct = await catalogPage.firstProduct();
      var itemName = await firstProduct.getName();
      var itemPrice = await firstProduct.getPrice();

      await test.step('Add product to cart', async () => {
        await firstProduct.addToCart();
        Logger.log(`Added product "${itemName}" priced at ${itemPrice} to the cart`);
      });

      await test.step('Proceed to checkout', async () => {
        await catalogPage.openCart();
        const items = await cartPage.getCartItems();
        expect(await items[0].getName()).toBe(itemName);
        await cartPage.proceedToCheckout();
      });

      await test.step('Fill shipping form and place order', async () => {
        await checkoutPage.fillShippingInfo({
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Elm Street',
          stateProvince: 'RM',
          postalCode: '8320000',
        });

        await checkoutPage.submitShippingInfo();
        await confirmationPage.waitForPageLoad();

        expect(await confirmationPage.getUrl()).toContain('/confirmation');
        expect(await confirmationPage.confirmationMessage.isVisible()).toBe(true);

        expect(await confirmationPage.confirmationMessage.textContent()).toContain(
          'Your Order has been successfully placed',
        );

        Logger.log(`Order placed successfully for product "${itemName}".`);
      });
    },
  );
});
