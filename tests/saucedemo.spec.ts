import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage'; 
import users from '../data/users.json';

let loginPage: LoginPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  await loginPage.goto();
});

// --- SECTION 1: DATA-DRIVEN LOGIN TESTS ---
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

// --- SECTION 2: FUNCTIONAL TESTS ---
test('Standard User can add a product to cart', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await expect(productsPage.cartBadge).toHaveText('1');
}); // <--- This closes the Cart test properly

test('Standard User can complete a full purchase journey', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Add product and navigate to cart
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await page.click('.shopping_cart_link'); 
  await page.click('[data-test="checkout"]'); 

  // 3. Fill Shipping Info
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.completeCheckout();

  // 4. Assertion
  await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
});