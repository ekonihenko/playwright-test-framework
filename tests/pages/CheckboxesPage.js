import { BasePage } from './BasePage.js';

export class CheckboxesPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkboxes = '#checkboxes input[type="checkbox"]';
    this.firstCheckbox = '#checkboxes input:first-of-type';
    this.secondCheckbox = '#checkboxes input:last-of-type';
  }

  async navigateToPage() {
    await this.navigateTo('/checkboxes');
  }

  async checkFirstCheckbox() {
    await this.page.check(this.firstCheckbox);
  }

  async uncheckSecondCheckbox() {
    await this.page.uncheck(this.secondCheckbox);
  }

  async isFirstCheckboxChecked() {
    return await this.page.isChecked(this.firstCheckbox);
  }

  async isSecondCheckboxChecked() {
    return await this.page.isChecked(this.secondCheckbox);
  }

  async getCheckboxesCount() {
    return await this.page.$$eval(this.checkboxes, (elements) => elements.length);
  }
}
