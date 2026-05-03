import { test, expect } from '@fixtures/fixtures';
import { users } from '@test-data/users';

test('user can login', { tag: '@smoke' }, async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.demo.username, users.demo.password);
  await loginPage.waitForPageLoad();
  await expect(loginPage.isLoggedIn()).toBeTruthy();
  await expect(loginPage.header.customerName).toHaveText('demouser');
  await expect(loginPage.header.logoutLink).toBeVisible();
});
