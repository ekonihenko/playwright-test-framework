import { test, expect } from '@playwright/test';

test.describe('Обнаружение ошибок', () => {
  test('Тест 1: Обнаружение ошибок', async ({ page }) => {
    console.log('🔍 Starting Test 1: Missing Element Error');

    await page.goto('https://demoqa.com/automation-practice-form');

    try {
      const nonExistentElement = page.locator('#element-that-does-not-exist');
      await expect(nonExistentElement).toBeVisible({ timeout: 3000 });
    } catch (error) {
      console.log('✅ ОШИБКА НАЙДЕНА: Элемент не найден');

      await page.evaluate(() => {
        const overlay = document.createElement('div');
        overlay.id = 'error-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ff4444;
          color: white;
          padding: 20px;
          border-radius: 10px;
          z-index: 9999;
          font-size: 18px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
        overlay.innerHTML = '🚨 ОШИБКА: Элемент не найден!';
        document.body.appendChild(overlay);
      });

      await page.waitForTimeout(2000);

      await page.screenshot({ path: 'test-results/error-1.png' }).catch(() => {});

      throw new Error('🚨 ДЕФЕКТ UI: Элемент не найден. Оверлей отображается!');
    }
  });

  test('Тест2: Ошибка валидации', async ({ page }) => {
    console.log('🔍 Starting Test 2: Form Validation Error');

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.click('#submit');
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.id = 'validation-error';
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 16px;
        max-width: 300px;
      `;
      overlay.innerHTML = '⚠️ ОШИБКА: Заполните обязательные поля!';
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/error-2.png' }).catch(() => {});

    throw new Error('🚨 ДЕФЕКТ UI: Ошибка валидации формы!');
  });

  test('Тест 3 : Симуляция сетевых ошибок', async ({ page }) => {
    console.log('🔍 Starting Test 3: Network Error');

    await page.goto('https://demoqa.com/dynamic-properties');

    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.id = 'network-error';
      overlay.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 16px;
      `;
      overlay.innerHTML = '🌐 СЕТЕВАЯ ОШИБКА: Не удается загрузить данные!';
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/error-3.png' }).catch(() => {});

    throw new Error('🚨 ДЕФЕКТ UI: Сетевая ошибка!');
  });
});
