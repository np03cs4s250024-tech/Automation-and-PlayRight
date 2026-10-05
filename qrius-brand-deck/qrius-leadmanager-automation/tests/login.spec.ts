import { test, expect } from '@playwright/test';

test('login page has the correct title', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/Qrius Lead Manager/i);
});