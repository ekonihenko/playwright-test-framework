import { BasePage } from './BasePage.js';

export class DropdownPage extends BasePage {
  constructor(page) {
    super(page);
    this.dropdown = '#dropdown';
  }

  async navigateToPage() {
    await this.navigateTo('/dropdown');
  }

  async selectOption(value) {
    await this.page.selectOption(this.dropdown, value);
  }

  async getSelectedValue() {
    return await this.page.$eval(this.dropdown, (select) => select.value);
  }

  async getAllOptions() {
    return await this.page.$$eval(`${this.dropdown} option`, (options) =>
      options.map((option) => ({ value: option.value, text: option.textContent })),
    );
  }
}
