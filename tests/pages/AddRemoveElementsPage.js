import { BasePage } from './BasePage.js';

export class AddRemoveElementsPage extends BasePage {
  constructor(page) {
    super(page);
    this.addButton = 'button[onclick="addElement()"]';
    this.deleteButtons = '.added-manually';
    this.elementsContainer = '#elements';
  }

  async navigateToPage() {
    await this.navigateTo('/add_remove_elements/');
  }

  async addElement() {
    await this.page.click(this.addButton);
  }

  async removeElement(index = 0) {
    const deleteButtons = await this.page.$$(this.deleteButtons);
    if (deleteButtons[index]) {
      await deleteButtons[index].click();
    }
  }

  async getElementsCount() {
    return await this.page.$$eval(this.deleteButtons, (elements) => elements.length);
  }

  async addMultipleElements(count) {
    for (let i = 0; i < count; i++) {
      await this.addElement();
    }
  }
}
