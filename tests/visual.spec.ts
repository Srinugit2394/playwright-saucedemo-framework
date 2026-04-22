import { test, expect } from '@playwright/test';

test('Homepage Visual Comparison', async ({ page }) => {
  await page.goto('/');
  
  // 😈 Let's simulate a UI bug by changing the login button color to red
  await page.evaluate(() => {
    const loginButton = document.querySelector('#login-button') as HTMLElement;
    if (loginButton) loginButton.style.backgroundColor = 'red';
  });

  await expect(page).toHaveScreenshot('homepage-baseline.png', {
    fullPage: true,
  });
});;