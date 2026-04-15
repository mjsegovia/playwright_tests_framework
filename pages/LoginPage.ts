import { BasePage } from "../core/base/BasePage";
import { Locator } from '@playwright/test'

export class LoginPage extends BasePage {
    async goto() {
        await this.page.goto('/account/login');
    }

    get emailInput(): Locator {
    return this.page.getByLabel('Email Address');
  }

    get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

    get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

    async login(username: string, password: string) {
        await this.fill(this.emailInput, username, 'Email Input');
        await this.fill(this.passwordInput, password, 'Password Input');
        await this.click(this.loginButton, 'Login Button');      
    }
}
    