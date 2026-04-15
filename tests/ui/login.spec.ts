import { test, expect } from '../../core/fixtures/fixtures';

test('user can login', async ({ loginPage, myAccountPage }) => {
  await loginPage.goto();
  await loginPage.login('mj_segovia@hotmail.com', '123456789');
  await expect(myAccountPage['page']).toHaveURL(/account/);
  await expect(myAccountPage.getTitle()).toBe('Account Details and Order History');
  await expect(myAccountPage.sidebar.title).toHaveText('My Account');
  await expect(myAccountPage.sidebar.CustomerName).toHaveText('Maria Jose Segovia');
});