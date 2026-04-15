import {Page, Locator} from '@playwright/test'

export class SideBar {
    private page: Page;
    private sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator('.sidebar');
    }

    get title(): Locator {
        return this.sidebar.getByRole('heading', { level: 2 });
    }

    get customerName(): Locator {
        return this.sidebar.locator('.customer-name');
    }

    async getCustomerName(): Promise<string> {
        return await this.customerName.innerText();
    }
}