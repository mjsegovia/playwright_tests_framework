import { expect, test as setup } from '@playwright/test';
import { users } from '@test-data/users';
import { LoginPage } from '@pages/LoginPage';
import * as fs from 'fs';
import path from 'path';

// Route where it will save the sesion state
const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.demo.username, users.demo.password);
  //await loginPage.isLoggedIn() == true ? log('Authentication successful') : log('Authentication failed');
  await expect(page).toHaveURL('https://bstackdemo.com/?signin=true');
  expect(await loginPage.isLoggedIn()).toBeTruthy();

  // EXTRACT SESSION STORAGE
  const sessionData = await page.evaluate(() => {
    return JSON.stringify(window.sessionStorage);
  });

  //await page.context().storageState({ path: '.auth/user.json' });
  await page.context().storageState({ path: authFile });

  //Add manually the SessionStorage to the JSON file
  const currentStorage = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
  currentStorage.sessionStorage = JSON.parse(sessionData);
  fs.writeFileSync(authFile, JSON.stringify(currentStorage, null, 2));
});
