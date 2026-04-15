import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { MyAccountPage } from '../../pages/MyAccountPage';

type Fixtures = {
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));    
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },    
});

export { expect } from '@playwright/test';