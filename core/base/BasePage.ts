import { Page } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string ='/') {
    await this.page.goto(url);
  }

// async goto(): Promise<void> {
//  await this.page.goto(this.url);

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}