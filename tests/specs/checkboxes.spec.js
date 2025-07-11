import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage.js';

test.describe('Чекбоксы', () => {
  let checkboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigateToPage();
  });

  test('ДЕФЕКТ: Второй чекбокс проставлен как отмеченный', async () => {
    const firstChecked = await checkboxesPage.isFirstCheckboxChecked();
    const secondChecked = await checkboxesPage.isSecondCheckboxChecked();

    expect(firstChecked).toBe(false);

    expect(secondChecked).toBe(true);

    await checkboxesPage.checkFirstCheckbox();
    expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);

    await checkboxesPage.uncheckSecondCheckbox();
    expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(false);
  });
});
