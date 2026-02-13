import { expect, test } from '../fixtures/test-setup';
import { TestData } from '../data/constants';

test.describe('Webpay Plus Mall', () => {

  test.beforeEach(async ({ webpayPlusMallPage }) => {
    await webpayPlusMallPage.page.goto('/webpay-mall');
    await expect(webpayPlusMallPage.mainTitle).toBeVisible();
  });

  test('transaction-success', async ({ webpayPlusMallPage, webpayPage }) => {
    await webpayPlusMallPage.validatePageTitle('Webpay Mall - Creación de transacción Mall');
    // const token = await webpayPlusMallPage.validateCreateTransactionContent();
    await webpayPlusMallPage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await webpayPlusMallPage.validatePageTitle('Webpay Mall - Confirmar transacción');
    // await webpayPlusMallPage.validateCommitTransactionContent(token);
    // await webpayPlusMallPage.validateTransactionResult('AUTHORIZED', 0);
  });
});
