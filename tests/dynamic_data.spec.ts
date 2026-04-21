import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Purchase journey with random user data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Generate random data
  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomZip = faker.location.zipCode();

  console.log(`Testing with: ${randomFirstName} ${randomLastName}`);

  // 2. Execute the flow
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 3. Navigate to checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // 4. Fill the information manually (to verify before the page changes)
  await checkoutPage.firstNameInput.fill(randomFirstName);
  await checkoutPage.lastNameInput.fill(randomLastName);
  await checkoutPage.zipCodeInput.fill(randomZip);

  // 5. ASSERT HERE while the fields are still visible on this page
  await expect(checkoutPage.firstNameInput).toHaveValue(randomFirstName);
  console.log(`Verified input field contains: ${randomFirstName}`);

  // 6. NOW move forward and finish
  await checkoutPage.continueButton.click();
  await checkoutPage.completeCheckout();
  
  await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
  console.log('Successfully completed journey with dynamic data!');
});