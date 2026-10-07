import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';
import { leads } from '../test-data/leads';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);
});

test('search by lead name narrows the list', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await page
    .getByTestId('search-input')
    .fill(leads.existingLead.name);

  await expect(leadsPage.getLeadRows()).toHaveCount(2);

  await expect(leadsPage.getLeadRows().first()).toContainText(
    leads.existingLead.name
  );
});

test('search by company shows matching results', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await page
    .getByTestId('search-input')
    .fill(leads.existingLead.company);

  await expect(leadsPage.getLeadRows()).toHaveCount(2);

  await expect(leadsPage.getLeadRows().first()).toContainText(
    leads.existingLead.company
  );
});

test('searching for a nonexistent lead shows no results', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await page
    .getByTestId('search-input')
    .fill(leads.nonexistentLead);

  await expect(leadsPage.getLeadRows()).toHaveCount(0);

  await expect(leadsPage.getEmptyState()).toBeVisible();
});

test('lead count reflects filtered search results', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  await page
    .getByTestId('search-input')
    .fill(leads.existingLead.name);

  await expect(leadsPage.getLeadRows()).toHaveCount(2);
});