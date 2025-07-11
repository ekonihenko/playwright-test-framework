import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage.js';

test.describe('Dropdown Tests', () => {
  let dropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateToPage();
  });

  test('Выбор опций в dropdown работает корректно', async () => {
    const allOptions = await dropdownPage.getAllOptions();

    // Проверяем, что есть опции для выбора
    expect(allOptions.length).toBeGreaterThan(2);

    // Выбираем первую опцию
    await dropdownPage.selectOption('1');
    expect(await dropdownPage.getSelectedValue()).toBe('1');

    // Выбираем вторую опцию
    await dropdownPage.selectOption('2');
    expect(await dropdownPage.getSelectedValue()).toBe('2');
  });
});
