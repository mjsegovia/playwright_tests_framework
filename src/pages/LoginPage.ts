import { BasePage } from '@core/base/BasePage';
import { Header } from '@pages/components/Header';
import { Locator, Page } from '@playwright/test'

export class LoginPage extends BasePage {
  readonly header: Header;
  readonly path = '/signin';

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }
  
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  get usernameInput(): Locator {
   // return this.page.getByText('Select Username');
    return this.page.locator('#username');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'LOG IN' });
  }

  async clickSignInLink() {
    await this.click(this.header.signInLink, 'Sign In Link');
  }

  async login(username: string, password: string) {
    await this.usernameInput.click();
    await this.page.keyboard.type(username);
    await this.page.keyboard.press('Enter');
        
       // await this.fill(this.usernameInput, username, 'Username Input');
    await this.passwordInput.click();
    await this.page.keyboard.type(password);
    await this.page.keyboard.press('Enter');

    // await this.fill(this.passwordInput, password, 'Password Input');
    await this.click(this.loginButton, 'Login Button');
  }

  async isLoggedIn(): Promise<boolean> {

    await this.page.waitForURL('?signin=true')    
    return await this.header.logoutLink.isVisible();   
  }

 
}    