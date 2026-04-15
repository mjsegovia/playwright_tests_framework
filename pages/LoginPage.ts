import { BasePage } from "../core/base/BasePage";
import { Page, Locator} from '@playwright/test'

export class LoginPage extends BasePage {
    async goto() {
        await this.page.goto('/login');
    }

    get emailInput(): Locator {
    return this.page.getByLabel('Email address');
  }

    get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

    get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Log in' });
  }

    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();        
    }
}
    