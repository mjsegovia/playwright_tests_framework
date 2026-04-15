import {Page, Locator} from '@playwright/test'

export class SideBar {
    private page: Page;
    private sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator('#sidebar');
    }

    get title(): Locator {
        return this.sidebar.locator('h2');
    }

    get links(): Locator {
        return this.sidebar.locator('a');
    }

}