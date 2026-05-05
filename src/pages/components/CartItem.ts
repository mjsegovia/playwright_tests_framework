import { Locator } from '@playwright/test';
import { ProductInfo } from '../../types/Product';
import { parsePrice } from '../../utils/price';

export class CartItem {
  constructor(private readonly root: Locator) {}

  get itemName(): Locator {
    return this.root.locator('.shelf-item__details .title');
  }

  get itemPrice(): Locator {
    return this.root.locator('.shelf-item__price');
  }

  get description(): Locator {
    return this.root.locator('.desc');
  }

  get removeItemButtons(): Locator {
    return this.root.locator('.shelf-item__del');
  }

  async getName(): Promise<string> {
    return await this.itemName.innerText();
  }

  async getPrice(): Promise<number> {
    const priceText = await this.itemPrice.innerText();
    return parsePrice(priceText);
  }

  async getProductInfo(): Promise<ProductInfo> {
    return {
      name: await this.getName(),
      price: await this.getPrice(),
    };
  }

  async getQuantity(): Promise<number> {
    const descriptionText = await this.description.textContent();
    const match = descriptionText?.match(/Quantity:\s*(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
