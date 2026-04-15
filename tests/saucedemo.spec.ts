import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import users from '../data/users.json';

// --- STEP 1: DECLARE VARIABLES ---
// We use 'let' because the value will be assigned in the hook
let loginPage: LoginPage;
let productsPage: ProductsPage;

// --- STEP 2: THE HOOK ---
test.beforeEach(async ({ page }) => {
  // This runs before every single test in the loop
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  
  await loginPage.goto();
});

// --- STEP 3: THE LOOPED TESTS ---
for (const user of users) {
  test(`Login Test for: ${user.name}`, async ({ page }) => {
    // We don't need 'const' here anymore! 
    // We just use the 'loginPage' variable created above.
    await loginPage.login(user.username, user.password);

   // Change this line in your saucedemo.spec.ts:
if (user.name === 'Standard User' || user.name === 'Problem User') {
   // Use 'productHeader' because that is what you named it in the Page Object!
await expect(productsPage.productHeader).toBeVisible();
} else {
    await expect(loginPage.errorMessage).toBeVisible();
}
  });
}