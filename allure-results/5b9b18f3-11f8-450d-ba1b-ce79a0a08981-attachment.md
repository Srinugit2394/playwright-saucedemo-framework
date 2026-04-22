# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Homepage Visual Comparison
- Location: tests\visual.spec.ts:3:1

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  11423 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: homepage-baseline.png

Call log:
  - Expect "toHaveScreenshot(homepage-baseline.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 11423 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 11423 pixels (ratio 0.02 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Homepage Visual Comparison', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   
  6  |   // 😈 Let's simulate a UI bug by changing the login button color to red
  7  |   await page.evaluate(() => {
  8  |     const loginButton = document.querySelector('#login-button') as HTMLElement;
  9  |     if (loginButton) loginButton.style.backgroundColor = 'red';
  10 |   });
  11 | 
> 12 |   await expect(page).toHaveScreenshot('homepage-baseline.png', {
     |                      ^ Error: expect(page).toHaveScreenshot(expected) failed
  13 |     fullPage: true,
  14 |   });
  15 | });;
```