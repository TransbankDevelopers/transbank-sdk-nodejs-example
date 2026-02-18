import { Page, expect, Locator } from '@playwright/test';

export class WebpayPlusMallPage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly payButton: Locator;
  readonly tokenInput: Locator;
  readonly resultPreTag: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.getByRole('heading', { level: 1 });
    this.payButton = page.getByRole('button', { name: 'PAGAR' });
    this.tokenInput = page.getByRole('textbox');
    this.resultPreTag = page.locator('pre').filter({ hasText: '{ "vci":' }).first();
  }

  async validatePageTitle(expectedTitle: string) {
    await expect(this.page.getByRole('heading', { name: expectedTitle, level: 1, exact: true })).toBeVisible();
  }

  async initiateTransaction() {
    // Capture Buy Order and Session ID
    const table = this.page.locator('#ejemplo .table-container');
    const rowBuyOrder = table.locator('.row').filter({ hasText: 'Orden de compra (buyOrder)' });
    const buyOrder = (await rowBuyOrder.locator('.tbk-column').textContent())?.trim() || '';

    const rowSessionId = table.locator('.row').filter({ hasText: 'ID de sesión (sessionid)' });
    const sessionId = (await rowSessionId.locator('.tbk-column').textContent())?.trim() || '';

    // Capture Token
    await expect(this.tokenInput).toBeVisible();
    const token = await this.tokenInput.inputValue();
    expect(token).toBeTruthy();
    await this.payButton.click();

    return { token, buyOrder, sessionId };
  }

  async validateCreateTransactionContent() {
    // Top description
    await expect(this.page.getByText('En esta etapa, se procederá a la creación de una transacción con el fin de obtener un identificador único. Esto nos permitirá redirigir al Tarjetahabiente hacia el formulario de pago en el siguiente paso.')).toBeVisible();
    await expect(this.page.getByText('Todas las transacciones en este proyecto de ejemplo son realizadas en ambiente de integración.')).toBeVisible();

    // Step 1
    await expect(this.page.locator('#peticion').getByText('Paso 1: Petición')).toBeVisible();
    await expect(this.page.getByText('1. Comienza por importar la librería WebpayPlus en tu proyecto.')).toBeVisible();
    await expect(this.page.getByText('2. Luego, crea una transacción utilizando las funciones proporcionadas mediante el SDK.')).toBeVisible();
    const scriptStep1 = `const {
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransactionDetail,
WebpayPlus
} = require('transbank-sdk'); // ES5

import { 
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransactionDetail,
WebpayPlus 
} from 'transbank-sdk'; // ES6

const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

let details = [
  new TransactionDetail(
    amount,
    commerceCodeStore1, // Código de comercio Tienda 1
    buyOrderStore1),
  new TransactionDetail(
    amount2,
    commerceCodeStore2, // Código de comercio Tienda 2
    buyOrderStore2)
]
  
const createResponse = await tx.create(
  buyOrder, 
  sessionId, 
  returnUrl,
  details
);`;
    await expect(this.page.locator('#peticion pre')).toContainText(scriptStep1);

    // Step 2
    await expect(this.page.locator('#respuesta').getByText('Paso 2: Respuesta')).toBeVisible();
    await expect(this.page.getByText('Una vez que hayas creado la transacción, aquí encontrarás los datos de respuesta generados por el proceso:')).toBeVisible();
    const codeStep2 = this.page.locator('#respuesta pre');
    await expect(codeStep2).toBeVisible();
    const textStep2 = await codeStep2.textContent();
    expect(textStep2).toMatch(/'token':\s*'.+'/);
    expect(textStep2).toContain("'url': 'https://webpay3gint.transbank.cl/webpayserver/initTransaction'");

    const jsonTokenMatch = (textStep2 || '').match(/'token':\s*'(.+)'/);
    const jsonToken = jsonTokenMatch ? jsonTokenMatch[1] : '';

    // Step 3
    await expect(this.page.locator('#form').getByText('Paso 3: Creación del formulario')).toBeVisible();
    await expect(this.page.getByText('Utiliza estos datos de respuesta para construir el formulario de pago al Tarjetahabiente. Este formulario será la interfaz a través de la cual el usuario realizará su transacción.')).toBeVisible();
    const codeStep3 = this.page.locator('#form pre');
    await expect(codeStep3).toBeVisible();
    const textStep3 = await codeStep3.textContent();
    expect(textStep3).toContain('<form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST">');
    expect(textStep3).toMatch(/<input type="hidden" name="token_ws" value=".+"\/>/);
    expect(textStep3).toContain('<input type="submit" value="Pagar"/>');

    const formTokenMatch = (textStep3 || '').match(/value="(.+)"/);
    const formToken = formTokenMatch ? formTokenMatch[1] : '';

    // Example
    const exampleSection = this.page.locator('#ejemplo');
    await expect(exampleSection.getByText('Ejemplo', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Para llevar a cabo una transacción de compra en nuestro sistema, primero debemos crear la transacción. Utilizaremos los siguientes datos para configurar la transacción:')).toBeVisible();

    // Validate table
    const table = exampleSection.locator('.table-container');
    await expect(table).toBeVisible();
    const headers = table.locator('.header .column span');
    await expect(headers.nth(0)).toHaveText('Campo');
    await expect(headers.nth(1)).toHaveText('Valor');

    const rows = table.locator('.row');

    const rowBuyOrder = rows.filter({ hasText: 'Orden de compra (buyOrder)' });
    await expect(rowBuyOrder).toBeVisible();
    const buyOrder = (await rowBuyOrder.locator('.tbk-column').textContent())?.trim() || '';
    expect(buyOrder).toMatch(/^O-\d+$/);

    const rowSessionId = rows.filter({ hasText: 'ID de sesión (sessionid)' });
    await expect(rowSessionId).toBeVisible();
    const sessionId = (await rowSessionId.locator('.tbk-column').textContent())?.trim() || '';
    expect(sessionId).toMatch(/^S-\d+$/);

    const rowReturnUrl = rows.filter({ hasText: 'URL de retorno (returnUrl)' });
    await expect(rowReturnUrl).toBeVisible();
    await expect(rowReturnUrl.locator('.tbk-column')).toHaveText(/^http?:\/\/.*\/webpay-mall\/commit$/);

    const detailRows = rows.filter({ hasText: 'Codigo de comercio:' });
    await expect(detailRows).toHaveCount(2);

    const firstDetailValues = detailRows.nth(0).locator('.tbk-column');
    await expect(firstDetailValues.nth(0)).toHaveText(/^Monto:\s\d+$/);
    await expect(firstDetailValues.nth(1)).toHaveText('Codigo de comercio: 597055555536');
    await expect(firstDetailValues.nth(2)).toHaveText(/^Orden de compra:\sO-\d+$/);

    const secondDetailValues = detailRows.nth(1).locator('.tbk-column');
    await expect(secondDetailValues.nth(0)).toHaveText(/^Monto:\s\d+$/);
    await expect(secondDetailValues.nth(1)).toHaveText('Codigo de comercio: 597055555536');
    await expect(secondDetailValues.nth(2)).toHaveText(/^Orden de compra:\sO-\d+$/);

    await expect(this.page.getByText('Por último, con la respuesta del servicio que confirma la creación de la transacción, procedemos a crear el formulario de pago. Para fines de este ejemplo, haremos visible el campo "token_ws", el cual es esencial para completar el proceso de pago de manera exitosa.')).toBeVisible();

    await expect(this.page.getByText('Antes de continuar al formulario de Webpay, asegúrate de contar con los datos de las tarjetas de prueba que están en la')).toBeVisible();
    const docLink = this.page.getByRole('link', { name: 'documentación.' });
    await expect(docLink).toBeVisible();
    await expect(docLink).toHaveAttribute('href', 'https://transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba');

    // Validate Input Token
    await expect(this.tokenInput).toBeVisible();
    const inputToken = await this.tokenInput.inputValue();

    // Verify consistency
    expect(jsonToken).toBeTruthy();
    expect(formToken).toBeTruthy();
    expect(inputToken).toBeTruthy();
    expect(jsonToken).toBe(formToken);
    expect(inputToken).toBe(jsonToken);

    return inputToken;
  }

  async validateCommitTransactionContent(expectedToken: string) {
    // Top description
    await expect(this.page.getByText('En este paso es importante confirmar la transacción para notificar a Transbank que hemos recibido exitosamente los detalles de la transacción.')).toBeVisible();
    await expect(this.page.getByText('Es importante destacar que si la confirmación no se realiza, la transacción será caducada.')).toBeVisible();

    // Step 1
    await expect(this.page.getByText('Paso 1: Datos recibidos', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Después de completar el flujo en el formulario de pago, recibirás un GET con la siguiente información:')).toBeVisible();
    const codeStep1Text = (await this.page.locator('pre').filter({ hasText: "'token_ws':" }).first().textContent()) || '';
    expect(codeStep1Text).toMatch(/'token_ws':\s*.+/);
    expect(codeStep1Text).toContain(`'token_ws': ${expectedToken}`);

    // Step 2
    await expect(this.page.getByText('Paso 2: Petición', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Utilizarás el token recibido para confirmar la transacción mediante el SDK.')).toBeVisible();
    const snippetStep2 = `const token = request.body.token_ws;
const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const commitResponse = await tx.commit(token);`;
    await expect(this.page.locator('pre').filter({ hasText: 'const token = request.body.token_ws;' })).toContainText(snippetStep2);

    // Step 3
    await expect(this.page.getByText('Paso 3: Respuesta', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Una vez que la transacción ha sido confirmada Transbank proporcionará la siguiente información. Es fundamental conservar esta respuesta y verificar que el campo "response_code" tenga un valor de cero y que el campo "status" sea "AUTHORIZED".')).toBeVisible();
    const codeStep3 = this.page.locator('pre').filter({ hasText: '"vci":' }).first();
    await expect(codeStep3).toBeVisible();
    const textStep3 = (await codeStep3.textContent()) || '';

    const expectedKeys = [
      '"vci":',
      '"buy_order":',
      '"session_id":',
      '"card_detail":',
      '"card_number":',
      '"accounting_date":',
      '"transaction_date":',
      '"details":',
      '"amount":',
      '"status":',
      '"authorization_code":',
      '"payment_type_code":',
      '"response_code":',
      '"installments_number":',
      '"commerce_code":'
    ];
    for (const key of expectedKeys) {
      expect(textStep3).toContain(key);
    }

    // Step 4 - ready/instructions
    await expect(this.page.getByText('¡Listo!', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Con la confirmación exitosa, ya puedes mostrar al usuario una página de éxito de la transacción, proporcionándole la tranquilidad de que el proceso ha sido completado con éxito.')).toBeVisible();
    await expect(this.page.getByText('Después de confirmar la transacción, podrás realizar otras operaciones útiles:')).toBeVisible();
    await expect(this.page.getByText('Reembolsar: Puedes reversar o anular el pago según ciertas condiciones comerciales.')).toBeVisible();
    await expect(this.page.getByText('Consultar Estado: Hasta 7 días después de realizada la transacción, podrás consultar el estado de la transacción.')).toBeVisible();

    // Validate refund cards and amount consistency with response details
    const detailAmounts: string[] = [];
    const amountRegex = /"amount":\s*(\d+)/g;
    let amountMatch: RegExpExecArray | null = amountRegex.exec(textStep3);
    while (amountMatch) {
      detailAmounts.push(amountMatch[1]);
      amountMatch = amountRegex.exec(textStep3);
    }
    expect(detailAmounts.length).toBe(2);

    const refundCards = this.page.locator('.refund-card');
    await expect(refundCards).toHaveCount(2);
    await expect(refundCards.nth(0).getByText('Orden De Compra')).toBeVisible();
    await expect(refundCards.nth(1).getByText('Orden De Compra')).toBeVisible();

    const refundInputs = this.page.locator('.refund-card input');
    await expect(refundInputs).toHaveCount(2);
    const firstRefundAmount = await refundInputs.nth(0).inputValue();
    const secondRefundAmount = await refundInputs.nth(1).inputValue();
    expect(firstRefundAmount).toBe(detailAmounts[0]);
    expect(secondRefundAmount).toBe(detailAmounts[1]);

    const statusButton = this.page.getByRole('link', { name: 'CONSULTAR ESTADO' });
    await expect(statusButton).toBeVisible();
    await expect(statusButton).toHaveAttribute('href', `/webpay-mall/status?token_ws=${expectedToken}`);
  }

  async validateTransactionResult(expectedStatus: 'AUTHORIZED' | 'FAILED', responseCode: number) {
    const title = expectedStatus === 'AUTHORIZED'
      ? 'Webpay Mall - Confirmar transacción'
      : 'Webpay Mall - Rechazo Bancario';

    await this.validatePageTitle(title);

    await expect(this.resultPreTag).toBeVisible();
    const textContent = (await this.resultPreTag.textContent()) || '';

    expect(textContent).toContain(`"status": "${expectedStatus}"`);
    expect(textContent).toContain(`"response_code": ${responseCode}`);
  }

  async validateTransactionFormErrorContent() {
    await this.validatePageTitle('Recuperar transacción');
    await expect(this.page.getByText('Se ha producido un error en el formulario de pago. Si ha hecho clic en el enlace "volver al sitio" desde la pantalla de error después de cerrar inesperadamente la pestaña del navegador y trata de recuperarla, es posible que haya recibido los siguientes tokens: token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA.')).toBeVisible();

    const textCode = this.page.locator('pre').first();
    if (await textCode.isVisible()) {
      const text = await textCode.textContent();
      const expectedKeys = [
        '"TBK_TOKEN":',
        '"token_ws":',
        '"TBK_ID_SESION":',
        '"TBK_ORDEN_COMPRA":'
      ];
      for (const key of expectedKeys) {
        expect(text).toContain(key);
      }
    }
  }

  async validateTransactionRejectedContent(expectedToken: string) {
    // Top description
    await expect(this.page.getByText('En esta fase, pueden surgir inconvenientes, ya sea con el titular de la tarjeta o a nivel bancario, lo que resulta en el estado final de la transacción siendo marcado como "FAILED".')).toBeVisible();

    // Step 1
    await expect(this.page.getByText('Paso 1: Datos recibidos', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Después de completar el flujo en el formulario de pago, recibirás un GET con la siguiente información:')).toBeVisible();
    const codeStep1Text = (await this.page.locator('pre').filter({ hasText: "'token_ws':" }).first().textContent()) || '';
    expect(codeStep1Text).toMatch(/'token_ws':\s*.+/);
    expect(codeStep1Text).toContain(`'token_ws': ${expectedToken}`);

    // Step 2
    await expect(this.page.getByText('Paso 2: Petición', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Utilizarás el token recibido para confirmar la transacción mediante el SDK.')).toBeVisible();
    const snippetStep2 = `const token = request.body.token_ws;
const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const commitResponse = await tx.commit(token);`;
    await expect(this.page.locator('pre').filter({ hasText: 'const token = request.body.token_ws;' })).toContainText(snippetStep2);

    // Step 3
    await expect(this.page.getByText('Paso 3: Respuesta', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Una vez que la transacción ha sido confirmada Transbank proporcionará la siguiente información. Es fundamental conservar esta respuesta y verificar que el campo "response_code" tenga un valor de cero y que el campo "status" sea "AUTHORIZED".')).toBeVisible();
    const codeStep3 = this.page.locator('pre').filter({ hasText: '"vci":' }).first();
    await expect(codeStep3).toBeVisible();
    const textStep3 = (await codeStep3.textContent()) || '';
    const expectedKeys = [
      '"vci":',
      '"buy_order":',
      '"session_id":',
      '"card_detail":',
      '"card_number":',
      '"accounting_date":',
      '"transaction_date":',
      '"details":',
      '"amount":',
      '"status":',
      '"authorization_code":',
      '"payment_type_code":',
      '"response_code":',
      '"installments_number":',
      '"commerce_code":'
    ];
    for (const key of expectedKeys) {
      expect(textStep3).toContain(key);
    }

    // Rejected response markers
    expect(textStep3).toContain('"status": "FAILED"');
    expect(textStep3).toContain('"response_code": -1');

    // Success-only section must not be present in rejected flow
    await expect(this.page.getByText('¡Listo!', { exact: true })).toHaveCount(0);
    await expect(this.page.getByText('Con la confirmación exitosa, ya puedes mostrar al usuario una página de éxito de la transacción, proporcionándole la tranquilidad de que el proceso ha sido completado con éxito.')).toHaveCount(0);
    await expect(this.page.getByText('Después de confirmar la transacción, podrás realizar otras operaciones útiles:')).toHaveCount(0);
    await expect(this.page.getByText('Reembolsar: Puedes reversar o anular el pago según ciertas condiciones comerciales.')).toHaveCount(0);
    await expect(this.page.getByText('Consultar Estado: Hasta 7 días después de realizada la transacción, podrás consultar el estado de la transacción.')).toHaveCount(0);
    
    // refund/status actions should not be displayed
    await expect(this.page.locator('.refund-card')).toHaveCount(0);
    await expect(this.page.getByRole('link', { name: 'CONSULTAR ESTADO' })).toHaveCount(0);
  }

}
