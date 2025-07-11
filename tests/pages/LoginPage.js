import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '.fa-sign-in';
    this.flashMessage = '#flash';
    this.logoutButton = '.icon-signout';
  }

  async navigateToPage() {
    await this.navigateTo('/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getFlashMessage() {
    return await this.page.textContent(this.flashMessage);
  }

  async isLoggedIn() {
    return await this.page.isVisible(this.logoutButton);
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }
}
