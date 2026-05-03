import { Locator } from '@playwright/test';

export class ProductCard {
  constructor(private readonly root: Locator) {}

  get title(): Locator {
    return this.root.locator('.shelf-item__title');
  }

  get price(): Locator {
    return this.root.locator('.shelf-item__price .val');
  }

  get addToCartButton(): Locator {
    return this.root.getByText('Add to cart');
  }

  async getName(): Promise<string> {
    return await this.title.innerText();
  }

  async getPrice(): Promise<number> {
    const priceText = await this.price.innerText();
    const numericText = priceText.replace(/[^\d.]/g, '');

    return parseFloat(numericText);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
