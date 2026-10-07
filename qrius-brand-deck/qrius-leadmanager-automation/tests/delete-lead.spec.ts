import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';

test('admin can delete a lead', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leadsPage = new LeadsPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);

  const leadName = 'Anita Lama';

  await expect(leadsPage.getLeadByName(leadName)).toHaveCount(1);

  await leadsPage.deleteLead(leadName);

  await expect(leadsPage.getLeadByName(leadName)).toHaveCount(0);
});

test('agent does not see the delete button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leadsPage = new LeadsPage(page);

  await loginPage.goto();
  await loginPage.login('agent.qrius', 'Agent@123');

  await expect(page).toHaveURL(/leads/i);

  await expect(leadsPage.getLeadRows().first().getByTestId('delete-button')).toHaveCount(0);
});