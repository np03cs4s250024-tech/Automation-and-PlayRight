import { test, expect } from '@playwright/test';

test('admin login flow recorded with Playwright Codegen', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/leads/i);
});