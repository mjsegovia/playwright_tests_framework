import { test, expect } from '@fixtures/fixtures';
import { users } from '@test-data/users';

test('user can login', { tag: '@smoke' }, async ({ loginPage }) => {
  await test.step('Open Login Page', async () => {
    await loginPage.goto();
  });
  await test.step('Fill in credentials', async () => {
    await loginPage.login(users.demo.username, users.demo.password);
    await loginPage.waitForPageLoad();
  });
  await test.step('Verify Dashboard Access', async () => {
    await expect(loginPage.isLoggedIn()).toBeTruthy();
    await expect.soft(loginPage.header.customerName).toHaveText('demouser');
    await expect.soft(loginPage.header.logoutLink).toBeVisible();
  });
});
