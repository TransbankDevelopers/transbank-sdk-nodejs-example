import { expect, test } from '../fixtures/test-setup';
import { TestData } from '../data/constants';

test.describe('Webpay Plus', () => {

  test.beforeEach(async ({ webpayPlusPage }) => {
    await webpayPlusPage.page.goto('/webpay-plus');
    await expect(webpayPlusPage.mainTitle).toBeVisible();
  });

  test('transaction-success', async ({ webpayPlusPage, webpayPage }) => {
    await webpayPlusPage.validatePageTitle('Webpay Plus - Creación de transacción');
    const token = await webpayPlusPage.validateCreateTransactionContent();
    await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusPage.validatePageTitle('Webpay Plus - Confirmar transacción');
    await webpayPlusPage.validateCommitTransactionContent(token);
    await webpayPlusPage.validateTransactionResult('AUTHORIZED', 0);
  });

  test('transaction-rejected', async ({ webpayPlusPage, webpayPage }) => {
    const { token } = await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSN'
    );

    await webpayPlusPage.validateTransactionResult('FAILED', -1);
    await webpayPlusPage.validateTransactionRejectedContent(token);
  });

  test('aborted-from-webpay', async ({ webpayPlusPage, webpayPage }) => {
    const { token } = await webpayPlusPage.initiateTransaction();
    await webpayPage.abortTransaction();

    await webpayPlusPage.validateAbortedResult();
    await webpayPlusPage.validateTransactionCanceledContent(token);
  });

  test('check-status', async ({ webpayPlusPage, webpayPage }) => {
    const { token } = await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusPage.clickCheckStatus();
    await webpayPlusPage.validateStatusTransactionContent(token);
  });

  test('refund', async ({ webpayPlusPage, webpayPage }) => {
    const { token } = await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    const refundAmount = await webpayPlusPage.clickRefund();
    await webpayPlusPage.validateRefundContent(token, refundAmount);
  });

  test('partial-refund', async ({ webpayPlusPage, webpayPage }) => {
    await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusPage.makePartialRefund();
    await webpayPlusPage.validatePartialRefundResponse();
  });

  test('generic-form-error', async ({ webpayPlusPage, webpayPage }) => {
    await webpayPlusPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);
    await webpayPage.triggerFormError();

    await webpayPlusPage.validateTransactionFormErrorContent();
  });

  test('timeout', async ({ webpayPlusPage }) => {
    await webpayPlusPage.validateCreateTransactionContent();
    const { buyOrder, sessionId } = await webpayPlusPage.initiateTransaction();

    // Simulate timeout callback
    await webpayPlusPage.page.goto(`/webpay-plus/commit?TBK_ID_SESION=${sessionId}&TBK_ORDEN_COMPRA=${buyOrder}`);

    await webpayPlusPage.validateTransactionTimeoutContent(buyOrder, sessionId);
  });
});
