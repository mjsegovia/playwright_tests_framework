import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CartPage } from '@pages/CartPage';
import { ProductsPage } from '@pages/ProductsPage';
import { ConfirmationPage } from '@pages/ConfirmationPage';

type Fixtures = {
  loginPage: LoginPage;
  productPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  confirmationPage: ConfirmationPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));    
  },
  productPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
   confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

export { expect } from '@playwright/test';