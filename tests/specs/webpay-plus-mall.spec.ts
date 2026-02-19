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
});
