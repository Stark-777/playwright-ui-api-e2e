const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');

test.describe('Registration Tests', () => {
  test('User can register successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const randomEmail = `testuser_${Date.now()}@mailinator.com`;

    await registerPage.navigate();
    await registerPage.fillSignupForm('Test User', randomEmail);
    await registerPage.fillDetails();
    await registerPage.assertAccountCreated();

    await registerPage.goToAccountPage();
    await registerPage.deleteAccount();
    await registerPage.assertAccountDeleted();
  });
});