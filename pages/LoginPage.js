const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginLink = this.page.locator('a[href="/login"]');
    this.emailInput = this.page.locator('input[data-qa="login-email"]');
    this.passwordInput = this.page.locator('input[data-qa="login-password"]');
    this.loginButton = this.page.locator('button[data-qa="login-button"]');
    this.loginError = this.page.locator('p:has-text("incorrect")');
    this.loggedInMessage = this.page.locator('a:has-text("Logged in as")');
  }

  async navigate() {
    await this.page.goto('/');
    await this.loginLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginFailed() {
    await expect(this.loginError).toBeVisible();
  }

  async assertLoginSuccess(username) {
    await expect(this.loggedInMessage).toContainText(username);
  }
};