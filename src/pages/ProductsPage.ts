import { Locator, Page } from '@playwright/test';
import { BasePage } from '@core/base/BasePage';
import { ProductCard } from './components/ProductCard';

export class ProductsPage extends BasePage {

    
    get productCards(): Locator {
        return this.page.locator('.shelf-container .shelf-item');
    }

    get cartButton(): Locator {
        return this.page.locator('[class*="float-cart"]');
    }

   /* async getAllProducts(): Promise<ProductCard[]> {
        const cards: ProductCard[] = [];
        const count = await this.productCards.count();
        for (let i = 0; i < count; i++) {
          const cardLocator = this.productCards.nth(i);
          cards.push(new ProductCard(this.page, cardLocator));
        }
        return cards;
      }*/

    async firstProduct(): Promise<ProductCard> {
        return new ProductCard(this.page, this.productCards.first());
    }

    async goToCart(): Promise<void> {
        await Promise.all([
            this.cartButton.click(),          
        ]);


    
}