import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage.js';

test.describe('Добавление/удаление элементов', () => {
  let addRemovePage;

  test.beforeEach(async ({ page }) => {
    addRemovePage = new AddRemoveElementsPage(page);
    await addRemovePage.navigateToPage();
  });

  test('Добавление и удаление элементов работает корректно', async () => {
    await addRemovePage.addMultipleElements(3);
    let elementsCount = await addRemovePage.getElementsCount();
    expect(elementsCount).toBe(3);

    await addRemovePage.removeElement(0);
    elementsCount = await addRemovePage.getElementsCount();
    expect(elementsCount).toBe(2);

    await addRemovePage.removeElement(0);
    await addRemovePage.removeElement(0);
    elementsCount = await addRemovePage.getElementsCount();
    expect(elementsCount).toBe(0);
  });
});
