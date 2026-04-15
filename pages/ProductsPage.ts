// pages/ProductsPage.ts
import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productHeader: Locator; // This must be a Locator type
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // FIX: Use page.locator() to create a Locator object
    this.productHeader = page.locator('.title'); 
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProductToCart(productName: string) {
    await this.page.locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }
}