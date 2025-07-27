const { expect } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.nameInput = this.page.getByTestId('signup-name');
    this.emailInput = this.page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');

    this.genderMr = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.addressInput = page.locator('#address1');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');

    this.accountCreatedHeader = page.locator('h2:has-text("Account Created!")');

    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.accountDeletedHeader = page.locator('h2:has-text("Account Deleted!")');
  }

  async navigate() {
    await this.page.goto('/');
    await this.signupLoginLink.click();
  }

  async fillSignupForm(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async fillDetails() {
    await this.genderMr.check();
    await this.passwordInput.fill('SecurePass123!');
    await this.daysSelect.selectOption('1');
    await this.monthsSelect.selectOption('1');
    await this.yearsSelect.selectOption('2000');
    await this.newsletterCheckbox.check();
    await this.firstNameInput.fill('John');
    await this.lastNameInput.fill('Doe');
    await this.addressInput.fill('123 Main St');
    await this.stateInput.fill('Utah');
    await this.cityInput.fill('Herriman');
    await this.zipcodeInput.fill('84096');
    await this.mobileInput.fill('+1234567890');
    await this.createAccountButton.click();
  }

  async assertAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async goToAccountPage() {
    await this.continueButton.click();
}

  async deleteAccount() {
    await this.deleteAccountLink.click();
}

  async assertAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
    await this.continueButton.click(); // Optional: to exit
}
};