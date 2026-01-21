import { test, expect } from '@playwright/test';
import { TestData } from './data/constants';
import { WebpayPage } from './pages/webpay.page';

test('transaccion-exitosa', async ({ page }) => {
  const webpay = new WebpayPage(page);
  await page.goto('http://localhost:3000/webpay-plus');

  await webpay.validateTransactionCreation();
  await webpay.fillCardInformation(TestData.debitCardNumber);
  await webpay.performBankAuthentication(TestData.transbankRut, TestData.transbankPassword, 'TSY');

  // Check page title
  await expect(page.getByRole('heading', { name: 'Webpay Plus - Confirmar transacción' })).toBeVisible();

  // Assert transaction success
  const finalPre = page.locator('pre').filter({ hasText: '{ "vci": "TSY", "amount":' });
  await expect(finalPre).toBeVisible();
  const finalText = (await finalPre.textContent()) ?? '';
  expect(finalText).toMatch(/"status":\s*"AUTHORIZED"/);
  expect(finalText).toMatch(/"response_code":\s*0/);
});

test('rechazo-bancario', async ({ page }) => {
  const webpay = new WebpayPage(page);
  await page.goto('http://localhost:3000/webpay-plus');

  await webpay.validateTransactionCreation();
  await webpay.fillCardInformation(TestData.debitCardNumber);
  await webpay.performBankAuthentication(TestData.transbankRut, TestData.transbankPassword, 'TSN');

  // Check page title
  await expect(page.getByRole('heading', { name: 'Webpay Plus - Rechazo Bancario' })).toBeVisible();

  // Assert transaction failure
  const finalPre = page.locator('pre').filter({ hasText: '{ "vci": "TSN", "amount":' });
  await expect(finalPre).toBeVisible();
  const finalText = (await finalPre.textContent()) ?? '';
  expect(finalText).toMatch(/"status":\s*"FAILED"/);
  expect(finalText).toMatch(/"response_code":\s*-1/);
});
