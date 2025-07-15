const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginLink = this.page.getByRole('link', { name: ' Signup / Login' });
    this.emailInput = this.page.getByTestId('login-email');
    this.passwordInput = this.page.getByRole('textbox', {name: 'password'});
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.loginError = this.page.getByText('Your email or password is incorrect!');
    this.loggedInMessage = this.page.getByText('Logged in as');
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