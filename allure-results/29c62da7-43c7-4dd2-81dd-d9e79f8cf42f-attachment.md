# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Homepage Visual Comparison
- Location: tests\visual.spec.ts:3:1

# Error details

```
Error: page.goto: Timeout was reached
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Homepage Visual Comparison', async ({ page }) => {
> 4  |   await page.goto('/'); // Uses the baseURL from your config
     |              ^ Error: page.goto: Timeout was reached
  5  |   
  6  |   // This will capture a screenshot and compare it
  7  |   await expect(page).toHaveScreenshot('homepage-baseline.png', {
  8  |     fullPage: true,
  9  |   });
  10 | });
```