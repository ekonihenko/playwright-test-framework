import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToPage();
  });

  test('Успешный логин с валидными данными', async () => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    expect(await loginPage.isLoggedIn()).toBe(true);

    const successMessage = await loginPage.getFlashMessage();
    expect(successMessage).toContain('You logged into a secure area!');
  });

  test('ДЕФЕКТ: Неуспешный логин с невалидными данными', async () => {
    await loginPage.login('wronguser', 'wrongpass');
    const errorMessage = await loginPage.getFlashMessage();
    expect(errorMessage).toContain('Your username is invalid!');

    // Проверяем, что пользователь не залогинен
    expect(await loginPage.isLoggedIn()).toBe(false);
  });
});
