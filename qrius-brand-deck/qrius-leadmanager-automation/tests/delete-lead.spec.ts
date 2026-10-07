import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeadsPage } from '../pages/LeadsPage';

test('admin can delete a lead', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leadsPage = new LeadsPage(page);

  await loginPage.goto();
  await loginPage.login('admin.qrius', 'Admin@123');

  await expect(page).toHaveURL(/leads/i);

  const uniqueId = Date.now();

  const uniqueLead = {
    name: `Roshan Delete ${uniqueId}`,
    email: `roshan.delete.${uniqueId}@example.com`,
    company: `Delete Company ${uniqueId}`,
  };

  await leadsPage.clickAddLead();

  await leadsPage.addLead(
    uniqueLead.name,
    uniqueLead.email,
    uniqueLead.company,
    'New'
  );

  await expect(
    leadsPage.getLeadByName(uniqueLead.name)
  ).toHaveCount(1);

  await leadsPage.deleteLead(uniqueLead.name);

  await expect(
    leadsPage.getLeadByName(uniqueLead.name)
  ).toHaveCount(0);
});

test('agent does not see the delete button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leadsPage = new LeadsPage(page);

  await loginPage.goto();
  await loginPage.login('agent.qrius', 'Agent@123');

  await expect(page).toHaveURL(/leads/i);

  await expect(
    leadsPage
      .getLeadRows()
      .first()
      .getByTestId('delete-button')
  ).toHaveCount(0);
});