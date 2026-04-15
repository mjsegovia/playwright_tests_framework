import { Page, Locator } from '@playwright/test';
import { Logger } from '../logger';

export abstract class BasePage {
  protected page: Page;
  protected contenedorPrincipal: Locator;

  constructor(page: Page) {     
    this.page = page;
     this.contenedorPrincipal = page.locator('#page-content');    
  }

  async goto(url: string ='/') {
    Logger.action(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator:Locator, name: string) {
    Logger.action(`Clicking on ${name}`);
    await locator.click();
  }

  async fill(locator:Locator, value: string, name: string) {
    Logger.action(`Filling ${name} with ${value}`);
    await locator.fill(value);
  }

// async goto(): Promise<void> {
//  await this.page.goto(this.url);

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}