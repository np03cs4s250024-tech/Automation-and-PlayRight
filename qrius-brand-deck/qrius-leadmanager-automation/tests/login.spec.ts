import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login page has the correct title', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page).toHaveTitle(/Qrius Lead Manager/i);
});

test('valid admin can sign in and reach the Leads page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);
});

test('valid agent can sign in and see their role', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('agent.qrius', 'Agent@123');

  await expect(page).toHaveURL(/leads/i);
  await expect(page.getByTestId('nav-role')).toHaveText(/AGENT/i);
});

test('wrong password shows an error and stays on login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'WrongPassword');

  await expect(page).toHaveURL(/login/i);
  await expect(page.getByText(/invalid|incorrect|wrong|error/i)).toBeVisible();
});