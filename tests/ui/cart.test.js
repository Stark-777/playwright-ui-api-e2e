const { test } = require('@playwright/test');
const { CartPage } = require('../../pages/CartPage');
const { firstProductName } = require('../../fixtures/product.fixture');

test.describe('Cart Tests', () => {
  test('User can add a product to cart and see it there', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.addFirstProductToCart();
    await cartPage.goToCart();
    await cartPage.assertProductInCart(firstProductName);
  });
});
