import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);
});

// Test editing an existing lead's status
test('admin can edit a lead status', async ({ page }) => {
  const leadsPage = new LeadsPage(page);

  const leadName = 'Anita Lama';

  await leadsPage.editLead(leadName, 'Qualified');

  const lead = leadsPage.getLeadByName(leadName);

  await expect(lead).toHaveCount(1);
  await expect(lead.getByTestId('lead-status')).toHaveText('Qualified');
});