import { BasePage } from '@core/base/BasePage';
import { Locator, Page } from '@playwright/test'

export class ConfirmationPage extends BasePage {
  
  constructor(page: Page) {
          super(page);
  }
  
  get url(): string {
    return '/confirmation';
  }
   
  get confirmationMessage(): Locator {
    return this.page.locator('#confirmation-message');
  }

  get downloadOrderReceiptLink(): Locator {
    return this.page.locator('#downloadpdf');
  }

  get continueShoppingLink(): Locator {
    return this.page.getByRole('button', { name: 'Continue Shopping »' });
  }

}  