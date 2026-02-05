import { test } from '../fixtures/test-setup';
import { TestData } from '../data/constants';

test.describe('Webpay Plus', () => {

  test.beforeEach(async ({ tbkDevelopersExamplePage }) => {
    await tbkDevelopersExamplePage.gotoWebpayPlus();
  });

  test('transaction-success', async ({ tbkDevelopersExamplePage, webpayPage }) => {
    await tbkDevelopersExamplePage.validatePageTitle('Webpay Plus - Creación de transacción');
    const token = await tbkDevelopersExamplePage.validateCreateTransactionContent();

    await tbkDevelopersExamplePage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSY'
    );

    await tbkDevelopersExamplePage.validatePageTitle('Webpay Plus - Confirmar transacción');
    await tbkDevelopersExamplePage.validateCommitTransactionContent(token);
    await tbkDevelopersExamplePage.validateTransactionResult('AUTHORIZED', 0);
  });

  test('transaction-rejected', async ({ tbkDevelopersExamplePage, webpayPage }) => {
    await tbkDevelopersExamplePage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);

    await webpayPage.performBankSimulation(
      TestData.transbankRut,
      TestData.transbankPassword,
      'TSN'
    );

    await tbkDevelopersExamplePage.validateTransactionResult('FAILED', -1);
  });

  test('aborted-from-webpay', async ({ tbkDevelopersExamplePage, webpayPage }) => {
    await tbkDevelopersExamplePage.initiateTransaction();
    await webpayPage.abortTransaction();

    await tbkDevelopersExamplePage.validateAbortedResult();
  });

});
