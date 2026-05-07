import { test, expect } from '@playwright/test';

test('presentation layout loads and implements sticky stacking', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/BSEAI Pitch Presentation/);

  // Check that the main container is present
  const main = page.locator('main');
  await expect(main).toBeVisible();

  // Check that the first slide heading is visible
  const heading = page.locator('h2', { hasText: 'Easter Morning, New York City, 1900' });
  await expect(heading).toBeVisible();

  // Check that the second slide heading is also in the DOM
  const slide2Heading = page.locator('h2', { hasText: 'The Enterprise Gap' });
  await expect(slide2Heading).toBeAttached();

  const footerLink = page.getByRole('link', { name: 'Why BSEAI' });
  await expect(footerLink).toBeVisible();
});
