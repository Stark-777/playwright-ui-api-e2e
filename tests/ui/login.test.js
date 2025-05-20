const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Tests', () => {
  test('Login with invalid credentials should show error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('fake@example.com', 'wrongpassword');
    await loginPage.assertLoginFailed();
  });

  test('Login with valid credentials should work', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.navigate();
    await loginPage.login('aleksstarik777@gmail.com', 'Test1234!!');
    await loginPage.assertLoginSuccess('Stark-777');
  });
});