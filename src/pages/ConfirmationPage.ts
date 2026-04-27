import { BasePage } from '@core/base/BasePage';
import { Locator, Page } from '@playwright/test'

export class ConfirmationPage extends BasePage {
  
  readonly path = '**/confirmation'
  constructor(page: Page) {
          super(page);
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL(this.path, { waitUntil: 'domcontentloaded' });

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