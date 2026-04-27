import {Page, Locator} from '@playwright/test';
//FIX: fix the path
import { ProductCard } from './components/ProductCard';
import { CartItem } from './components/CartItem';

export class CartPage {
    
    protected readonly page: Page;
    //readonly productContainer: Locator;
    
    constructor(page: Page) {
        this.page = page;

        //TODO: delete if the test passes without it, it was added to try to fix a problem with the locator of the cart items
      //  this.productContainer = this.page.locator('shelf-item');
    }
        

    get cartContainer(): Locator {
        return this.page.locator('.float-cart__content') ;
    }

    get cartTitle(): Locator {
        return this.cartContainer.locator('.header-title');
    }

   
    get cartItems(): Locator {
        return this.cartContainer.locator('.shelf-item');
    }

    get checkoutButton(): Locator {
        return this.cartContainer.getByText('CHECKOUT');
    }

    get emptyCartMessage(): Locator {
        return this.cartContainer.locator('.shelf-empty');
    }  
    
     get subtotal(): Locator {
        return this.cartContainer.locator('.sub-price__val');
    }

    

    async getCartItems(): Promise<CartItem[]> {
        const items = await this.cartItems.all();

        //Map them to CartItem components
        return items.map(item => new CartItem(this.page, item));        
    }

    async getSubtotal(): Promise<number> {
        const subtotalText = await this.subtotal.innerText();

        const numericText = subtotalText.replace(/[^\d.]/g, '');

        return parseFloat(numericText);
    }   

    async proceedToCheckout(): Promise<void>{
      await this.checkoutButton.click();
    }

}