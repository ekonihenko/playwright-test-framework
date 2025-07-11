import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage.js';

test.describe('Выпадающий список', () => {
  let dropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateToPage();
  });

  test('Выбор опций в dropdown работает корректно', async () => {
    const allOptions = await dropdownPage.getAllOptions();

    expect(allOptions.length).toBeGreaterThan(2);

    await dropdownPage.selectOption('1');
    expect(await dropdownPage.getSelectedValue()).toBe('1');

    await dropdownPage.selectOption('2');
    expect(await dropdownPage.getSelectedValue()).toBe('2');
  });
});
