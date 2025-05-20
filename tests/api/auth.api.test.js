const { test, expect, request } = require('@playwright/test');

test.describe('DummyJSON Auth API - Final Fix', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://dummyjson.com',
    });
  });

  test('should login successfully with valid credentials (via fetch)', async () => {
    const response = await apiContext.fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
      }),
    });

    console.log('Response status:', response.status());
    const body = await response.json();
    console.log('Response body:', body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('accessToken');
    expect(body.username).toBe('emilys');
  });
});
