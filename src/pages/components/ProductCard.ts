import {Page, Locator} from '@playwright/test'

export class ProductCard {

    private page: Page;
    private root: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.root = root;
    }

    get title(): Locator {
        return this.root.locator('.shelf-item__title');
    }

    get price(): Locator {
        return this.root.locator('.shelf-item__price');
    }

    get addToCartButton(): Locator {
        return this.root.getByText('Add to cart');
    }

    async getName(): Promise<string> {
        return await this.title.innerText();
    }

    async getPrice(): Promise<number> {
       /* var integerPart = await this.price.locator('.val .b').innerText();
        var decimalPart = await this.price.locator('span').innerText();

        const priceString = '${integerPart}${decimalPart}';
        return parseFloat(priceString);*/

        const priceText = await this.price.innerText();
        const numericText = priceText.replace(/[^\d.]/g, '');

        return parseFloat(numericText);
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
