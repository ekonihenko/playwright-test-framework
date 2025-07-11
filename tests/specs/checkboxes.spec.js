import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage.js';

test.describe('Checkboxes Tests', () => {
  let checkboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigateToPage();
  });

  test('ДЕФЕКТ: Второй чекбокс предустановлен как отмеченный', async () => {
    // Проверяем начальное состояние чекбоксов
    const firstChecked = await checkboxesPage.isFirstCheckboxChecked();
    const secondChecked = await checkboxesPage.isSecondCheckboxChecked();

    expect(firstChecked).toBe(false);
    // ДЕФЕКТ: второй чекбокс отмечен по умолчанию, хотя не должен быть
    expect(secondChecked).toBe(true); // Этот тест покажет дефект

    // Проверяем функциональность
    await checkboxesPage.checkFirstCheckbox();
    expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);

    await checkboxesPage.uncheckSecondCheckbox();
    expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(false);
  });
});
