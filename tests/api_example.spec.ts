import { test, expect } from '@playwright/test';

test('Should be able to fetch a list of posts via API', async ({ request }) => {
  // Send a GET request
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  
  // Verify the status code is 200 (OK)
  expect(response.status()).toBe(200);

  // Verify the data inside the JSON response
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.title).toBeDefined();
});