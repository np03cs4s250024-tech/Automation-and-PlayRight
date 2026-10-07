import { Page, Locator } from '@playwright/test';

export class LeadsPage {
  constructor(private page: Page) {}

  getLeadRows(): Locator {
    return this.page.getByTestId('lead-row');
  }

  getRole(): Locator {
    return this.page.getByTestId('nav-role');
  }

  getEmptyState(): Locator {
    return this.page.getByTestId('empty-state');
  }
}