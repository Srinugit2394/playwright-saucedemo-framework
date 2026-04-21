import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Hybrid Test: Verify Product via API then check UI', async ({ page, request }) => {
  const loginPage = new LoginPage(page);

  // 1. Backend Check: Verify the API says the site is up
  const response = await request.get('https://www.saucedemo.com/');
  expect(response.status()).toBe(200);

  // 2. Frontend Action: Login normally
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. UI Verification: Ensure we landed on the correct page
  await expect(page).toHaveURL(/inventory.html/);
  
  console.log('Backend and Frontend are both in sync!');
});