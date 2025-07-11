export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path) {
    await this.page.goto(path);
  }

  async getTitle() {
    return await this.page.title();
  }

  async waitForElement(selector, options = {}) {
    return await this.page.waitForSelector(selector, options);
  }

  async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }
}
