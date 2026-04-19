import { test, expect } from '@core/fixtures/fixtures';

test('user can login', async ({ loginPage}) => {
  await loginPage.goto();
  await loginPage.login('demouser', 'testingisfun99');
  await loginPage.waitForPageLoad();
  await expect(loginPage['page']).toHaveURL("?signin=true")
  await expect(loginPage.header.customerName).toHaveText('demouser');
  await expect(loginPage.header.logoutLink).toBeVisible();
});