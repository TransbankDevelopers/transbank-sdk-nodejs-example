import { test, expect } from '@playwright/test';
import { TestData } from './data/constants';

test('transaccion-exitosa', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Ver ejemplos y modalidades' }).first().click();
  // Assert transaction creation
  const preTag = page.locator('pre').filter({ hasText: "{ 'token': '" });
  await expect(preTag).toBeVisible();
  const textContent = (await preTag.textContent()) ?? '';
  expect(textContent).toMatch(/'token':\s*'[^']+'/); // Token not empty
  expect(textContent).toMatch(/'url':\s*'[^']+'/);   // URL not empty
  await page.getByRole('button', { name: 'PAGAR' }).click();
  // Fill payment information in Webpay
  await page.getByRole('button', { name: 'Tarjetas Crédito, Débito,' }).click();
  await page.getByRole('textbox', { name: 'Número de tarjeta' }).click();
  const cardInput = page.getByRole('textbox', { name: 'Número de tarjeta' });
  await cardInput.fill(TestData.debitCardNumber);

  // Click panel to trigger validation/refresh (simulating user action)
  await page.locator('main-panel').click();

  // Check for error message
  const errorMsg = page.getByText('Intenta pagar con otra tarjeta');
  if (await errorMsg.isVisible({ timeout: 3000 })) {
    console.log('Detected card error, switching to Credit Card');
    await cardInput.clear();
    await cardInput.fill(TestData.creditCardNumber);
    await page.locator('main-panel').click();
    await page.getByRole('textbox', { name: 'Fecha de expiración' }).fill(TestData.creditCardExpirationDate);
    await page.getByRole('textbox', { name: 'CVV' }).fill(TestData.creditCardCvv);
  }

  await page.getByRole('button', { name: 'Pagar' }).click();
  // Authorize transaction
  await page.locator('#rutClient').click();
  await page.locator('#rutClient').fill(TestData.transbankRut);
  await page.locator('#rutClient').press('Tab');
  await page.locator('#passwordClient').fill(TestData.transbankPassword);
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.locator('#vci').selectOption('TSY');
  await page.getByRole('button', { name: 'Continuar' }).click();

  // Assert transaction success
  const finalPre = page.locator('pre').filter({ hasText: '{ "vci": "TSY", "amount":' });
  await expect(finalPre).toBeVisible();
  const finalText = (await finalPre.textContent()) ?? '';
  expect(finalText).toMatch(/"status":\s*"AUTHORIZED"/);
  expect(finalText).toMatch(/"response_code":\s*0/);
});
