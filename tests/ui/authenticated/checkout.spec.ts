import { Logger } from '../../../src/core/logger';
import { test, expect } from '@fixtures/fixtures';
import { loadSessionStorage } from '@utils/sessionStorage';

test.describe('Checkout critical flows', () => {
  test('should add item to cart', { tag: '@smoke' }, async ({ catalogPage, cartPage }) => {
    await catalogPage.navigate();

    const selectedProduct = await test.step('Add first product to cart', async () => {
      const product = await catalogPage.addFirstProductToCart();
      Logger.log(`Added product "${product.name}" priced at ${product.price} to the cart`);

      return product;
    });

    await test.step('Validate cart contents', async () => {
      await catalogPage.openCart();

      const items = await cartPage.getCartItems();
      expect(items.length).toBeGreaterThan(0);

      const [item] = items;
      const cartProduct = await item.getProductInfo();
      const quantity = await item.getQuantity();
      const subtotal = await cartPage.getSubtotal();

      expect.soft(cartProduct.name).toBe(selectedProduct.name);
      expect.soft(cartProduct.price).toBe(selectedProduct.price);
      expect.soft(quantity).toBe(1);
      expect.soft(subtotal).toBe(selectedProduct.price);
    });
  });

  test(
    'should complete checkout successfully',
    { tag: '@smoke' },
    async ({ page, catalogPage, cartPage, checkoutPage, confirmationPage }) => {
      await loadSessionStorage(page);
      await catalogPage.navigate();

      const selectedProduct = await test.step('Add product to cart', async () => {
        const product = await catalogPage.addFirstProductToCart();
        Logger.log(`Added product "${product.name}" priced at ${product.price} to the cart`);

        return product;
      });

      await test.step('Proceed to checkout', async () => {
        await catalogPage.openCart();
        const cartProduct = await cartPage.getFirstCartProduct();

        expect(cartProduct.name).toBe(selectedProduct.name);
        expect(cartProduct.price).toBe(selectedProduct.price);

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

        Logger.log(`Order placed successfully for product "${selectedProduct.name}".`);
      });
    },
  );
});
