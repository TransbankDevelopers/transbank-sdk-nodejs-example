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
  await page.getByRole('button', { name: 'Tarjetas Crédito, Débito,' }).click();
  await page.getByRole('textbox', { name: 'Número de tarjeta' }).click();
  // Set card number from test variables
  const cardInput = page.getByRole('textbox', { name: 'Número de tarjeta' });
  await cardInput.fill(TestData.debitCardNumber);
  await page.getByRole('button', { name: 'Pagar' }).click();
  await page.locator('#rutClient').click();
  // Set rut from test variables
  await page.locator('#rutClient').fill(TestData.transbankRut);
  await page.locator('#rutClient').press('Tab');
  // Set password from test variables
  await page.locator('#passwordClient').fill(TestData.transbankPassword);
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
});
