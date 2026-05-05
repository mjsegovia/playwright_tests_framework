import { Locator } from '@playwright/test';
import { ProductInfo } from '../../types/Product';
import { parsePrice } from '../../utils/price';

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

    return parsePrice(priceText);
  }

  async getProductInfo(): Promise<ProductInfo> {
    return {
      name: await this.getName(),
      price: await this.getPrice(),
    };
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
