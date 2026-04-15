import { BasePage } from '../core/base/BasePage';
import { Logger } from '../core/logger';
import { SideBar } from './components/sideBar';
import { Page, Locator } from '@playwright/test';

export class MyAccountPage extends BasePage {
    readonly sidebar: SideBar;
    protected mainContainer: Locator;    

    constructor(page: Page) {
        super(page);
        this.sidebar = new SideBar(page);
        this.mainContainer = page.locator('#page-content'); 
    }

    get titleMyAccountPage(): Locator {
        return this.mainContainer.getByRole('heading', { level: 1 });
    }
    
    async getTitle(): Promise<string> {
        return await this.titleMyAccountPage.innerText();
    }
}   