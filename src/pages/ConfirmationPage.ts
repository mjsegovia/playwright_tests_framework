import { BasePage } from '@core/base/BasePage';
import { Locator, Page } from '@playwright/test'

export class LoginPage extends BasePage {
  
  constructor(page: Page) {
          super(page);                  
      }

  async goto() {
        await this.page.goto('/confirmation')
  }
  

}