import {Page, Locator} from '@playwright/test';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get cartContainer(): Locator {
        return this.page.locator('[class*="float-cart--open"]');
    }

    get cartTitle(): Locator {
        return this.cartContainer.locator('.header-title');
    }

    get cartItems(): Locator {
        return this.cartContainer.locator('.shelf-item');
    }

    get subtotal(): Locator {
        return this.cartContainer.locator('.sub-price__val');
    }

    get checkoutButton(): Locator {
        return this.cartContainer.getByText('CHECKOUT');
    }

    get emptyCartMessage(): Locator {
        return this.cartContainer.locator('.shelf-empty');
    }   

    get removeItemButtons(): Locator {
        return this.cartItems.locator('.shelf-item__del');
    }

   // async getCartItems(): Promise<Product[]>
}