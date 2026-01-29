import { test } from '../fixtures/test-setup';
import { TestData } from '../data/constants';

test.describe('Webpay Plus', () => {

  test.beforeEach(async ({ tbkDevelopersExamplePage }) => {
    await tbkDevelopersExamplePage.gotoWebpayPlus();
  });

  test('transaction-success', async ({ tbkDevelopersExamplePage, webpayPage }) => {
    await tbkDevelopersExamplePage.validatePageTitle('Webpay Plus - Creación de transacción');
    
    await tbkDevelopersExamplePage.initiateTransaction();
    await webpayPage.payWithCard(TestData.debitCardNumber);
    
    await webpayPage.performBankSimulation(
      TestData.transbankRut, 
      TestData.transbankPassword, 
      'TSY'
    );

    await tbkDevelopersExamplePage.validateTransactionResult('AUTHORIZED', 0);
  });

  test('transaction-rejected', async ({ tbkDevelopersExamplePage, webpayPage }) => {
    await tbkDevelopersExamplePage.validatePageTitle('Webpay Plus - Creación de transacción');
    
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
    await tbkDevelopersExamplePage.validatePageTitle('Webpay Plus - Creación de transacción');
    
    await tbkDevelopersExamplePage.initiateTransaction();
    await webpayPage.abortTransaction();

    await tbkDevelopersExamplePage.validateAbortedResult();
  });

});