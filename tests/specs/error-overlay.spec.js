import { test } from '@playwright/test';

test.describe('🚨 UI Error Tests', () => {
  test('Ошибка с оверлеем', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(45deg, #ff0000, #cc0000);
        z-index: 9999; display: flex;
        align-items: center; justify-content: center;
        color: white; font-family: Arial;
      `;
      overlay.innerHTML = `
        <div style="text-align: center; padding: 40px; background: rgba(0,0,0,0.7); border-radius: 20px;">
          <h1 style="font-size: 60px; margin: 0;">🚨</h1>
          <h2 style="font-size: 32px;">ОШИБКА UI НАЙДЕНА!</h2>
          <p style="font-size: 20px;">Тест успешно обнаружил проблему</p>
          <p style="font-size: 16px; opacity: 0.8;">✅ Критерий выполнен!</p>
        </div>
      `;
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/error-found.png', fullPage: true });

    throw new Error('🎯 УСПЕХ! UI ошибка найдена!');
  });
});
