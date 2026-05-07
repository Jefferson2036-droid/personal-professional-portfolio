import { test, expect } from '@playwright/test';

test('homepage loads and displays key structural elements', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/BSEAI Pitch Presentation/);

  const main = page.locator('main');
  await expect(main).toBeVisible();

  const heading = page.locator('h1', { hasText: 'In 1900, this street made sense' });
  await expect(heading).toBeVisible();

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});
