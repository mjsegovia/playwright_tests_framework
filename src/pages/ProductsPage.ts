import { Locator, Page } from '@playwright/test';
import { BasePage } from '@core/base/BasePage';
import { ProductCard } from './components/ProductCard';

//TODO: change name class to CatalogPage
export class ProductsPage extends BasePage {

    
    get productCards(): Locator {
        return this.page.locator('.shelf-container .shelf-item');
    }

    get cart(): Locator {
        return this.page.locator('.float-cart');
    }

    //TODO: Create a method to return all products as ProductCard components USINC 
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

    //TODO: Create a method to find a product by name and return a ProductCard
   /* async findProductByName(name: string): Promise<ProductCard> {
        const card = this.productCards.filter({
            has: this.page.locator('.shelf-item__title', { hasText: name })
        }).first();

        return new ProductCard(this.page, card);
    }*/

     async isOpen(): Promise<boolean> {
        return await this.cart.evaluate(el =>
        el.classList.contains('float-cart--open')
        ); 
}



       



    async openCart(): Promise<void> {
        await this.cart.click();        
    }
}