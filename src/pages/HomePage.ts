import { BasePage } from '@core/base/BasePage';
import { Header } from '@components/Header';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  get firstProduct(): Locator {
    return this.page.locator('#1');
  }

  async gettitle(): Promise<string> {
    return this.page.locator('.shelf-container').first().innerText();
  }
}
