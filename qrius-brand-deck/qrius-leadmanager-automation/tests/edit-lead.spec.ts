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

test('admin can edit a lead status', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  const leadName = leads.editLead.name;

  await leadsPage.editLead(
    leadName,
    leads.editLead.newStatus
  );

  const lead = leadsPage.getLeadByName(leadName);

  await expect(lead).toHaveCount(1);
  await expect(
    lead.getByTestId('lead-status')
  ).toHaveText(leads.editLead.newStatus);
});