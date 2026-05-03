import { Page, Locator } from '@playwright/test';
import { CartItem } from '@components/CartItem';

export class CartPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartContent(): Locator {
    return this.page.locator('.float-cart__content');
  }

  get cartTitle(): Locator {
    return this.cartContent.locator('.header-title');
  }

  get cartItems(): Locator {
    return this.cartContent.locator('.shelf-item');
  }

  get checkoutButton(): Locator {
    return this.cartContent.getByText('CHECKOUT');
  }

  get emptyCartMessage(): Locator {
    return this.cartContent.getByText('Add some products in the bag ');
  }

  get subtotal(): Locator {
    return this.cartContent.locator('.sub-price__val');
  }
  get cartContainer(): Locator {
    return this.page.locator('.float-cart');
  }

  async isOpen(): Promise<boolean> {
    return await this.cartContainer.evaluate((el) => el.classList.contains('float-cart--open'));
  }

  async getCartItems(): Promise<CartItem[]> {
    const items = await this.cartItems.all();

    //Map item to CartItem components
    return items.map((item) => new CartItem(this.page, item));
  }

  async getSubtotal(): Promise<number> {
    const subtotalText = await this.subtotal.innerText();
    const numericText = subtotalText.replace(/[^\d.]/g, '');

    return parseFloat(numericText);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
