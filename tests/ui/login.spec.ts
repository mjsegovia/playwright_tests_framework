import { test, expect } from '../../core/fixtures/fixtures';

test('user can login', async ({ loginPage, myAccountPage }) => {
  await loginPage.navigateTo('/login');
  await loginPage.login('mj_segovia@hotmail.com', '123456789');
  await expect(myAccountPage.accountInfoSection()).toBeDefined();
});
