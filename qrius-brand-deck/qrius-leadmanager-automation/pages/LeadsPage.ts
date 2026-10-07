import { Page } from '@playwright/test';

export class LeadsPage {
  constructor(private page: Page) {}

  async getLeadRows() {
    return this.page.getByTestId('lead-row');
  }

  async getRole() {
    return this.page.getByTestId('nav-role');
  }
}