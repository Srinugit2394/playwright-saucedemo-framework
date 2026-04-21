import { test, expect } from '@playwright/test';

test('API Request Chaining: Create and then Fetch a post', async ({ request }) => {
  // STEP 1: Create a new post
  const createResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Playwright API Testing',
      body: 'Learning request chaining',
      userId: 1,
    }
  });

  expect(createResponse.status()).toBe(201); // 201 means "Created"
  const newPost = await createResponse.json();
  const postId = newPost.id; // Usually returns 101 in this mock API
  console.log(`Created Post ID: ${postId}`);

  // STEP 2: Use the ID from Step 1 to fetch the post
  // Note: Since this is a mock API, we'll fetch ID 1 to simulate a successful chain
  const getResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
  
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  
  // Verify we are getting back valid data
  expect(getBody.id).toBe(1);
  console.log('Successfully chained and fetched the data!');
});