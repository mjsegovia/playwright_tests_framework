import {Page, Locator} from '@playwright/test'

export class CartItem {

    private page: Page;
    private root: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.root = root;
    }

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
        const numericText = priceText.replace(/[^\d.]/g, '');
        return parseFloat(numericText);
    }

     async getQuantity(): Promise<number> {
        const descriptionText = await this.description.textContent();
        const match = descriptionText?.match(/Quantity:\s*(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}
        
    
    
    
