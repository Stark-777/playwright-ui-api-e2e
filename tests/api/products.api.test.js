// tests/api/products.api.test.js
const { test, expect, request } = require('@playwright/test');

test.describe("DummyJSON Product API", () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: "https://dummyjson.com",
    });
  });

  test("GET /products should return a list of products", async () => {
    const res = await apiContext.get("/products");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("GET /products/search?q=phone should return relevant results", async () => {
    const res = await apiContext.get("/products/search?q=phone");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.products.length).toBeGreaterThan(0);
    const titles = body.products.map((p) => p.title.toLowerCase());
    expect(titles.some((title) => title.includes("phone"))).toBe(true);
  });
});
