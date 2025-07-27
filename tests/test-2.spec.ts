import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.booking.com/');
  await page.getByRole('combobox', { name: 'Where are you going?' }).click();
  await page.getByRole('combobox', { name: 'Where are you going?' }).fill('Downtown Salt Lake');
  await page.getByRole('button', { name: 'Downtown Salt Lake City Salt' }).click();
  await page.getByRole('button', { name: 'Mo 21 July' }).click();
  await page.getByRole('button', { name: 'Fr 25 July' }).click();
  await page.getByRole('button', { name: 'Search' }).click();

  try {
       await page.locator('//button[@aria-label="Close map"]').click();
  } catch (error) {
    console.log('No close map btn found');
  }

  await page.locator('//input[starts-with(@aria-label, "5 stars")]').first().click();
  await page.locator('//input[starts-with(@aria-label, "4 stars")]').first().click();
  await page.waitForTimeout(2000);

  let titles = await page.getByTestId('title').allTextContents();
  await page.waitForTimeout(2000);
  
  const propertyCards = await page.getByTestId('property-card').all();
  let prices: string[] = [];
  for (const card of propertyCards) {
  const priceElements = await card.getByTestId('price-and-discounted-price').allTextContents();
  if (priceElements.length > 1) {
    prices.push(priceElements[1]);
  }
}
  console.log('Titles:', titles);
  console.log('Prices:', prices);
  let nPrices: number [] = [];
  prices.forEach(price => {
    nPrices.push(parseInt(price.replace(/[^0-9]/g, '')));
  } );
  console.log('Prices:', nPrices);

  let minPrice = Math.min(...nPrices);
  let maxPrice = Math.max(...nPrices);
  console.log('Min Price:', minPrice);
  console.log('Max Price:', maxPrice);

  let rangeSize = (maxPrice - minPrice) / 3;
  let lowBound = minPrice + rangeSize;
  let highBound = maxPrice - rangeSize;
  
  console.log('Low Bound:', lowBound);
  console.log('High Bound:', highBound);

  const hotels = titles.map((title, i) => ({
    title,
    price: nPrices[i],
  }));

  let lowHotels: string[] = [];
  let midHotels: string[] = [];
  let highHotels: string[] = [];

  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    if (hotel.price <= lowBound) {
      lowHotels.push(hotel.title);
    } else if (hotel.price <= highBound) {
      midHotels.push(hotel.title);
    } else {
      highHotels.push(hotel.title);
    }
}

  console.log('Low Price Hotels:', lowHotels);
  console.log('Mid Price Hotels:', midHotels);
  console.log('High Price Hotels:', highHotels);
      
});