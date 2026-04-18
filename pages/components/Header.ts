import {Page, Locator} from '@playwright/test'

export class header {
    private page: Page;
    private header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('.Navbar_root__2kbI9');
    }

    get customerName(): Locator {
        return this.header.locator('.username');
    }
    get logoutLink(): Locator {
        return this.header.getByRole('link', { name: 'Logout' });
    }
    get signInLink(): Locator {
        return this.header.getByRole('link', { name: 'Sign In' });
    }

    async getCustomerName(): Promise<string> {
        return await this.customerName.innerText();
    }
}