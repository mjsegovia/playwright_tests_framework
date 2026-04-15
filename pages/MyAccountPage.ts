import {Page, Locator} from '@playwright/test'
import { BasePage } from '../core/base/BasePage';
import { SideBar } from './components/sideBar';

export class MyAccountPage extends BasePage {

    
    async accountInfoSection(): Promise<SideBar> {
        return new SideBar(this.page);
    }

}

    