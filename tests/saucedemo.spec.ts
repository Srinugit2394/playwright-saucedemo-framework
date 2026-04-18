import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import users from '../data/users.json';

let loginPage: LoginPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  await loginPage.goto();
});

for (const user of users) {
  test(`Login Test for: ${user.name}`, async ({ page }) => {
    await loginPage.login(user.username, user.password);

    if (user.name === 'Standard User' || user.name === 'Problem User') {
      await expect(productsPage.productHeader).toBeVisible();
    } else {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  }); 
}

test('Standard User can add a product to cart', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await expect(productsPage.cartBadge).toHaveText('1');
});