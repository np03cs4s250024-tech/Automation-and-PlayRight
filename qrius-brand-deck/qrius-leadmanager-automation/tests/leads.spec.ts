import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);
});

test('leads list displays 12 leads', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await expect(await leadsPage.getLeadRows()).toHaveCount(12);
});

test('leads list displays the signed-in user role', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await expect(await leadsPage.getRole()).toHaveText(/ADMIN/i);
});