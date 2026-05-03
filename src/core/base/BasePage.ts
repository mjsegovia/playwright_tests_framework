import { Page, Locator } from '@playwright/test';
//Fix: Import Logger from the correct path
import { Logger } from '../logger';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async navigate(url: string = '/') {
    Logger.action(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator, name: string) {
    Logger.action(`Clicking on ${name}`);
    await locator.click();
  }

  async fill(locator: Locator, value: string, name: string) {
    Logger.action(`Filling ${name} with ${value}`);
    await locator.fill(value);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
