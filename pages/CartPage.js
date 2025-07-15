const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.firstProduct = page.locator('.features_items .product-image-wrapper').first();
    this.addToCartButton = page.locator('.overlay-content > .btn').first();
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = page.getByRole('link', { name: ' Cart' });
    this.cartItems = page.getByRole('link', { name: 'Blue Top' });
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

  async assertProductInCart(expectedName) {
    await expect(this.cartItems).toBeVisible();
    await expect(this.cartItems).toContainText(expectedName);
  }
};