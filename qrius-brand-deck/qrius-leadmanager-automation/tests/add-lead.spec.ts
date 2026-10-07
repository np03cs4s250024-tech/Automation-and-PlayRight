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

test('admin can add a new lead with a chosen status', async ({ page }) => {
  const leadsPage = new LeadsPage(page);
  const uniqueId = Date.now();

  const uniqueLead = {
    name: `Roshan Add ${uniqueId}`,
    email: `roshan.add.${uniqueId}@example.com`,
    company: `Add Company ${uniqueId}`,
    status: leads.newLeadStatus,
  };

  await leadsPage.clickAddLead();

  await expect(page.getByTestId('lead-modal')).toBeVisible();

  await leadsPage.addLead(
    uniqueLead.name,
    uniqueLead.email,
    uniqueLead.company,
    uniqueLead.status
  );

  await expect(page.getByTestId('lead-modal')).not.toBeVisible();

  await expect(
    leadsPage.getLeadByName(uniqueLead.name)
  ).toHaveCount(1);
});

test('new lead appears with the selected status', async ({ page }) => {
  const leadsPage = new LeadsPage(page);
  const uniqueId = Date.now();

  const uniqueLead = {
    name: `Roshan Status ${uniqueId}`,
    email: `roshan.status.${uniqueId}@example.com`,
    company: `Status Company ${uniqueId}`,
    status: leads.selectedStatus,
  };

  await leadsPage.clickAddLead();

  await leadsPage.addLead(
    uniqueLead.name,
    uniqueLead.email,
    uniqueLead.company,
    uniqueLead.status
  );

  const newLead = leadsPage.getLeadByName(uniqueLead.name);

  await expect(newLead).toHaveCount(1);
  await expect(newLead).toContainText(uniqueLead.name);
  await expect(newLead).toContainText(uniqueLead.company);

  await expect(
    newLead.getByTestId('lead-status')
  ).toHaveText(uniqueLead.status);
});