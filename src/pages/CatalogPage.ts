import { Locator } from '@playwright/test';
import { BasePage } from '@core/base/BasePage';
import { ProductCard } from '@components/ProductCard';
import { ProductInfo } from '../types/Product';

export class CatalogPage extends BasePage {
  get productCards(): Locator {
    return this.page.locator('.shelf-container .shelf-item');
  }

  get cartButton(): Locator {
    return this.page.locator('.float-cart');
  }

  async getAllProducts(): Promise<ProductCard[]> {
    const items = this.productCards.all();
    return (await items).map((item) => new ProductCard(item));
  }

  async firstProduct(): Promise<ProductCard> {
    return new ProductCard(this.productCards.first());
  }

  async getProductByName(name: string): Promise<ProductCard> {
    const item = this.productCards
      .filter({
        hasText: name,
      })
      .first();

    await item.waitFor({ state: 'visible' });

    return new ProductCard(item);
  }

  async addProductToCart(product: ProductCard): Promise<ProductInfo> {
    const productInfo = await product.getProductInfo();
    await product.addToCart();

    return productInfo;
  }

  async addFirstProductToCart(): Promise<ProductInfo> {
    const product = await this.firstProduct();

    return this.addProductToCart(product);
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }
}
