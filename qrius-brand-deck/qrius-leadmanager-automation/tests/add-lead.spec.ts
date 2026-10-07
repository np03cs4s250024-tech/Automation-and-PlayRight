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

  const uniqueLead = {
    name: `Roshan Add ${Date.now()}`,
    email: `roshan.add.${Date.now()}@example.com`,
    company: `Add Company ${Date.now()}`,
    status: leads.newLead.status,
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

  await leadsPage.clickAddLead();

  await leadsPage.addLead(
    leads.statusLead.name,
    leads.statusLead.email,
    leads.statusLead.company,
    leads.statusLead.status
  );

  const newLead = leadsPage.getLeadByName(leads.statusLead.name);

  await expect(newLead).toHaveCount(1);
  await expect(newLead).toContainText(leads.statusLead.name);
  await expect(newLead).toContainText(leads.statusLead.company);
  await expect(newLead.getByTestId('lead-status')).toHaveText(
    leads.statusLead.status
  );
});