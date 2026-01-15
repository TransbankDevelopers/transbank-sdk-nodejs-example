import { test, expect } from '@playwright/test';

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
  // TODO: Set card number from test variables
  await page.getByRole('textbox', { name: 'Número de tarjeta' }).fill('4051 8842 3993 7763');
  await page.locator('main-panel').click();
  await page.getByRole('button', { name: 'Pagar' }).click();
  await page.locator('#rutClient').click();
  // TODO: Set rut from test variables
  await page.locator('#rutClient').fill('11.111.111-1');
  await page.locator('#rutClient').press('Tab');
  // TODO: Set password from test variables
  await page.locator('#passwordClient').fill('123');
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
});
