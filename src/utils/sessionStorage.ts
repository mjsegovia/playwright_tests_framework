import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function loadSessionStorage(page: Page) {
  const authFile = path.join(process.cwd(), 'tests/.auth/user.json');
  const storage = JSON.parse(fs.readFileSync(authFile, 'utf-8'));

  await page.addInitScript((storageData) => {
    if (storageData) {
      for (const [key, value] of Object.entries(storageData)) {
        window.sessionStorage.setItem(key, value as string);
      }
    }
  }, storage.sessionStorage);
}