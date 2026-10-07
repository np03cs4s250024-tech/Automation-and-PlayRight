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

  async clickAddLead() {
    await this.page.getByTestId('add-lead-button').click();
  }

  async addLead(
    name: string,
    email: string,
    company: string,
    status: string
  ) {
    await this.page.getByTestId('name').fill(name);
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('company').fill(company);
    await this.page.getByTestId('status').selectOption(status);
    await this.page.getByTestId('save-button').click();
  }

  getLeadByName(name: string): Locator {
    return this.getLeadRows().filter({ hasText: name });
  }

  async editLead(name: string, status: string) {
    const lead = this.getLeadByName(name);

    await lead.getByTestId('edit-button').click();

    await this.page
      .getByTestId('lead-modal')
      .getByTestId('status')
      .selectOption(status);

    await this.page.getByTestId('save-button').click();
  }
}