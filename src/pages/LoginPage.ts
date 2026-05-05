import { BasePage } from '@core/base/BasePage';
import { Header } from '@pages/components/Header';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly header: Header;
  readonly path = '/signin';

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  async goto(): Promise<void> {
    await this.navigate(this.path);
    await this.waitForPageLoad();
  }

  get usernameDropdown(): Locator {
    return this.page.locator('#username');
  }

  get passwordDropdown(): Locator {
    return this.page.locator('#password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'LOG IN' });
  }

  async clickSignInLink() {
    await this.click(this.header.signInLink, 'Sign In Link');
  }

  async selectUsername(username: string): Promise<void> {
    await this.usernameDropdown.click();
    this.page.getByText(username, { exact: true }).click();
  }

  async selectPassword(password: string): Promise<void> {
    await this.passwordDropdown.click();
    await this.page.getByText(password, { exact: true }).click();
  }

  async login(username: string, password: string) {
    await this.selectUsername(username);
    await this.selectPassword(password);
    await this.click(this.loginButton, 'Login Button');
  }

  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForURL('?signin=true');
    return await this.header.logoutLink.isVisible();
  }
}
