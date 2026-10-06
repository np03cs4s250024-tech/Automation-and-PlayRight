import { test, expect } from '@playwright/test';

test('login page has the correct title', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/Qrius Lead Manager/i);
});

test('valid admin can sign in and reach the Leads page', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/leads/i);
});

test('valid agent can sign in and see their role', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('username').fill('agent.qrius');
  await page.getByTestId('password').fill('Agent@123');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/leads/i);
  await expect(page.getByText(/agent/i)).toBeVisible();
});

test('wrong password shows an error and stays on login page', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('WrongPassword');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/login/i);
  await expect(page.getByText(/invalid|incorrect|wrong|error/i)).toBeVisible();
});

