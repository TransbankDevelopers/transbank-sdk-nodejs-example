import { expect, test } from '../fixtures/test-setup';
import { TestData } from '../data/constants';

test.describe('Webpay Plus Mall', () => {

  test.beforeEach(async ({ webpayPlusMallPage }) => {
    await webpayPlusMallPage.page.goto('/webpay-mall');
    await expect(webpayPlusMallPage.mainTitle).toBeVisible();
  });

  test('transaction-success', async ({ webpayPlusMallPage, webpayPage }) => {
    await webpayPlusMallPage.validatePageTitle('Webpay Mall - Creación de transacción Mall');
    const token = await webpayPlusMallPage.validateCreateTransactionContent();
    await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusMallPage.validateCommitTransactionContent(token);
    await webpayPlusMallPage.validateTransactionResult('AUTHORIZED', 0);
  });

  test('transaction-rejected', async ({ webpayPlusMallPage, webpayPage }) => {
    const { token } = await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSN'
    );

    await webpayPlusMallPage.validateTransactionResult('FAILED', -1);
    await webpayPlusMallPage.validateTransactionRejectedContent(token);
  });

  test('generic-form-error', async ({ webpayPlusMallPage, webpayPage }) => {
    await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);
    await webpayPage.triggerFormError();

    await webpayPlusMallPage.validateTransactionFormErrorContent();
  });

  test('aborted-from-webpay', async ({ webpayPlusMallPage, webpayPage }) => {
    const { token } = await webpayPlusMallPage.initiateTransaction();
    await webpayPage.abortTransaction();

    await webpayPlusMallPage.validateAbortedResult();
    await webpayPlusMallPage.validateTransactionCanceledContent(token);
  });

  test('check-status', async ({ webpayPlusMallPage, webpayPage }) => {
    const { token } = await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusMallPage.clickCheckStatus();
    await webpayPlusMallPage.validateStatusTransactionContent(token);
  });

  test('refund', async ({ webpayPlusMallPage, webpayPage }) => {
    const { token } = await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    const refundAmount = await webpayPlusMallPage.clickRefund();
    await webpayPlusMallPage.validateRefundContent(token, refundAmount);
  });

  test('partial-refund', async ({ webpayPlusMallPage, webpayPage }) => {
    await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusMallPage.makePartialRefund();
    await webpayPlusMallPage.validatePartialRefundResponse();
  });

  test('timeout', async ({ webpayPlusMallPage }) => {
    await webpayPlusMallPage.validateCreateTransactionContent();
    const table = webpayPlusMallPage.page.locator('#ejemplo .table-container');
    const rowBuyOrder = table.locator('.row').filter({ hasText: 'Orden de compra (buyOrder)' });
    const buyOrder = (await rowBuyOrder.locator('.tbk-column').textContent())?.trim() || '';

    const rowSessionId = table.locator('.row').filter({ hasText: 'ID de sesión (sessionid)' });
    const sessionId = (await rowSessionId.locator('.tbk-column').textContent())?.trim() || '';

    // Simulate timeout callback
    const timeoutQuery = new URLSearchParams({
      TBK_ID_SESION: sessionId,
      TBK_ORDEN_COMPRA: buyOrder,
    }).toString();
    await webpayPlusMallPage.page.goto(`/webpay-mall/commit?${timeoutQuery}`, { waitUntil: 'domcontentloaded' });

    await webpayPlusMallPage.validateTransactionTimeoutContent(buyOrder, sessionId);
  });
});
