const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.firstProduct = page.locator('.features_items .product-image-wrapper').first();
    this.addToCartButton = this.firstProduct.locator('.productinfo .add-to-cart:visible');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a[href="/view_cart"]:visible');
    this.cartItems = page.locator('.cart_info');
    this.productNameInCart = page.locator('.cart_description h4 a');
  }

  async addFirstProductToCart() {
    await this.page.goto('/');
    await this.firstProduct.hover();
    await this.addToCartButton.click();
    await this.continueShoppingButton.click();
  }

  async goToCart() {
    await this.viewCartLink.click();
  }

  async assertProductInCart(expectedNamePartial) {
    await expect(this.cartItems).toBeVisible();
    await expect(this.productNameInCart).toContainText(expectedNamePartial);
  }
};