import { Page, expect, Locator } from '@playwright/test';

export class TbkDevelopersExamplePage {
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

  async gotoWebpayPlus() {
    await this.page.goto('/webpay-plus');
    await expect(this.mainTitle).toBeVisible();
  }

  async validatePageTitle(expectedTitle: string) {
    await expect(this.page.getByRole('heading', { name: expectedTitle, level: 1, exact: true })).toBeVisible();
  }

  async initiateTransaction() {
    await expect(this.tokenInput).toBeVisible();
    const token = await this.tokenInput.inputValue();
    expect(token).toBeTruthy();
    await this.payButton.click();
    return token;
  }

  async validateTransactionResult(expectedStatus: 'AUTHORIZED' | 'FAILED', responseCode: number) {
    const title = expectedStatus === 'AUTHORIZED'
      ? 'Webpay Plus - Confirmar transacción'
      : 'Webpay Plus - Rechazo Bancario';

    await this.validatePageTitle(title);

    await expect(this.resultPreTag).toBeVisible();
    const textContent = (await this.resultPreTag.textContent()) || '';

    expect(textContent).toContain(`"status": "${expectedStatus}"`);
    expect(textContent).toContain(`"response_code": ${responseCode}`);
  }

  async validateAbortedResult() {
    await this.validatePageTitle('Webpay Plus - Estado de compra cancelada');
    const abortPre = this.page.locator('pre').filter({ hasText: '{ "TBK_TOKEN": "' });
    await expect(abortPre).toBeVisible();
    const abortText = (await abortPre.textContent()) ?? '';
    expect(abortText).toMatch(/"TBK_TOKEN":\s*"[^"]+"/);
    expect(abortText).toMatch(/"TBK_ORDEN_COMPRA":\s*"[^"]+"/);
    expect(abortText).toMatch(/"TBK_ID_SESION":\s*"[^"]+"/);
  }

  async validateCreateTransactionContent() {
    // Top description
    await expect(this.page.getByText('En esta etapa, se procederá a la creación de una transacción con el fin de obtener un identificador único. Esto nos permitirá redirigir al Tarjetahabiente hacia el formulario de pago de Transbank en el siguiente paso.')).toBeVisible();
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
WebpayPlus
} = require('transbank-sdk') // ES5

import { 
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
WebpayPlus 
} from 'transbank-sdk'; // ES6

const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await tx.create(
  buyOrder, 
  sessionId, 
  amount, 
  returnUrl
);`;
    await expect(this.page.locator('#peticion pre')).toContainText(scriptStep1);

    // Step 2
    await expect(this.page.locator('#respuesta').getByText('Paso 2: Respuesta')).toBeVisible();
    await expect(this.page.getByText('Una vez que hayas creado la transacción, aquí encontrarás los datos de respuesta generados por el proceso.')).toBeVisible();
    const codeStep2 = this.page.locator('#respuesta pre');
    await expect(codeStep2).toBeVisible();
    const textStep2 = await codeStep2.textContent();
    expect(textStep2).toMatch(/'token':\s*'.+'/);
    expect(textStep2).toContain("'url': 'https://webpay3gint.transbank.cl/webpayserver/initTransaction'");

    // Token extraction
    const jsonTokenMatch = (textStep2 || '').match(/'token':\s*'(.+)'/);
    const jsonToken = jsonTokenMatch ? jsonTokenMatch[1] : '';

    // Step 3
    await expect(this.page.locator('#form').getByText('Paso 3: Creación del formulario')).toBeVisible();
    await expect(this.page.getByText('Utiliza estos datos de respuesta para redireccionar al usuario al formulario de pago al Tarjetahabiente. Este formulario será la interfaz a través de la cual el usuario realizará su transacción.')).toBeVisible();
    const codeStep3 = this.page.locator('#form pre');
    await expect(codeStep3).toBeVisible();
    const textStep3 = await codeStep3.textContent();
    expect(textStep3).toContain('<form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST">');
    expect(textStep3).toMatch(/<input type="hidden" name="token_ws" value=".+"\/>/);
    expect(textStep3).toContain('<input type="submit" value="Pagar"/>');

    // Extract token from HTML form
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
    await expect(rowBuyOrder.locator('.tbk-column')).toHaveText(/^O-\d+$/);

    const rowSessionId = rows.filter({ hasText: 'ID de sesión (sessionid)' });
    await expect(rowSessionId).toBeVisible();
    await expect(rowSessionId.locator('.tbk-column')).toHaveText(/^S-\d+$/);

    const rowAmount = rows.filter({ hasText: 'Monto (amount)' });
    await expect(rowAmount).toBeVisible();
    await expect(rowAmount.locator('.tbk-column')).toHaveText(/^\d+$/);

    const rowReturnUrl = rows.filter({ hasText: 'URL de retorno (returnUrl)' });
    await expect(rowReturnUrl).toBeVisible();
    await expect(rowReturnUrl.locator('.tbk-column')).toHaveText(/^http?:\/\/.*\/webpay-plus\/commit$/);

    await expect(this.page.getByText('Por último, con la respuesta del servicio que confirma la creación de la transacción, procedemos a crear el formulario de pago. Para fines de este ejemplo, haremos visible el campo "token_ws", el cual es esencial para completar el proceso de pago de manera exitosa.')).toBeVisible();

    // Documentation test cards
    await expect(this.page.getByText('Antes de continuar al formulario de Webpay, asegúrate de contar con los datos de las tarjetas de prueba que están en la')).toBeVisible();
    const docLink = this.page.getByRole('link', { name: 'documentación.' });
    await expect(docLink).toBeVisible();
    await expect(docLink).toHaveAttribute('href', 'https://transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba');

    // Validate Input Token
    await expect(this.tokenInput).toBeVisible();
    const inputToken = await this.tokenInput.inputValue();

    // Verify Consistency
    expect(jsonToken).toBeTruthy();
    expect(formToken).toBeTruthy();
    expect(inputToken).toBeTruthy();
    expect(jsonToken).toBe(formToken);
    expect(inputToken).toBe(jsonToken);

    return inputToken;
  }

  async validateCommitTransactionContent(expectedToken: string) {
    // Top description
    await expect(this.page.getByText('En este paso es importante confirmar la transacción para notificar a Transbank que hemos recibido exitosamente los detalles de la transacción. Es importante destacar que si la confirmación no se realiza, la transacción será caducada.')).toBeVisible();

    // Step 1
    const step1Title = this.page.getByText('Paso 1: Datos recibidos', { exact: true });
    await expect(step1Title).toBeVisible();
    await expect(this.page.getByText('Después de completar el flujo en el formulario de pago, recibirás un GET con la siguiente información:')).toBeVisible();
    const codeStep1Text = (await this.page.locator('pre').filter({ hasText: "'token_ws':" }).first().textContent()) || '';
    expect(codeStep1Text).toMatch(/'token_ws':\s*.+/);

    // Verify Token Consistency in Commit Step
    expect(codeStep1Text).toContain(`'token_ws': ${expectedToken}`);

    // Step 2
    await expect(this.page.getByText('Paso 2: Petición', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Utilizarás el token recibido para confirmar la transacción mediante el SDK.')).toBeVisible();
    const snippetStep2 = `const token = request.body.token_ws;
const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const commitResponse = await tx.commit(token);`;
    await expect(this.page.locator('pre').filter({ hasText: "const token = request.body.token_ws;" })).toContainText(snippetStep2);

    // Step 3
    await expect(this.page.getByText('Paso 3: Respuesta', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Una vez que la transacción ha sido confirmada Transbank proporcionará la siguiente información. Es fundamental conservar esta respuesta y verificar que el campo "response_code" tenga un valor de cero y que el campo "status" sea "AUTHORIZED".')).toBeVisible();
    const codeStep3 = this.page.locator('pre').filter({ hasText: '"vci":' }).first();
    await expect(codeStep3).toBeVisible();
    const textStep3 = await codeStep3.textContent();
    const expectedKeys = [
      '"vci":', '"amount":', '"status":', '"buy_order":', '"session_id":',
      '"card_detail":', '"card_number":', '"accounting_date":', '"transaction_date":',
      '"authorization_code":', '"payment_type_code":', '"response_code":',
      '"installments_amount":', '"installments_number":', '"balance":'
    ];
    for (const key of expectedKeys) {
      expect(textStep3).toContain(key);
    }
    // Amount Consistency
    // Extract amount from JSON
    const jsonAmountMatch = (textStep3 || '').match(/"amount":\s*(\d+)/);
    const jsonAmount = jsonAmountMatch ? jsonAmountMatch[1] : '';

    // Success Message
    await expect(this.page.getByText('¡Listo!', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Con la confirmación exitosa, ya puedes mostrar al usuario una página de éxito de la transacción, proporcionándole la tranquilidad de que el proceso ha sido completado con éxito.')).toBeVisible();

    // Instructions
    await expect(this.page.getByText('Después de confirmar la transacción, podrás realizar otras operaciones útiles:')).toBeVisible();
    await expect(this.page.getByText('Reembolsar: Puedes reversar o anular el pago según ciertas condiciones comerciales.')).toBeVisible();
    await expect(this.page.getByText('Consultar Estado: Hasta 7 días después de realizada la transacción, podrás consultar el estado de la transacción.')).toBeVisible();

    // Verify Amount in Refund Input
    const refundInput = this.page.locator('.refund-card input');
    await expect(refundInput).toBeVisible();
    const refundAmountValue = await refundInput.inputValue();

    expect(jsonAmount).toBeTruthy();
    expect(refundAmountValue).toBeTruthy();
    expect(jsonAmount).toBe(refundAmountValue);
  }

  async clickCheckStatus() {
    await this.page.getByRole('link', { name: 'CONSULTAR ESTADO' }).click();
  }

  async validateStatusTransactionContent(expectedToken: string) {
    await this.validatePageTitle('Webpay Plus - Consultar estado de transacción');

    // Top description
    await expect(this.page.getByText('Puedes solicitar el estado de una transacción hasta 7 días después de su realización. No hay límite de solicitudes de este tipo durante ese período. Sin embargo, una vez pasados los 7 días, ya no podrás revisar su estado.')).toBeVisible();

    // Step 1
    const step1 = this.page.locator('div[class="flex-col"]').filter({ hasText: 'Paso 1: Petición' }).last();
    await expect(step1).toBeVisible();
    await expect(step1.getByText('Para realizar la consulta, necesitas el token de la transacción de la cual deseas obtener el estado. Utiliza este token para realizar una llamada al SDK.')).toBeVisible();
    const scriptStep1 = `// Token: ${expectedToken}
const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const statusResponse = await tx.status(token);`;
    await expect(step1.locator('pre')).toContainText(scriptStep1);

    // Step 2
    const step2 = this.page.locator('div[class="flex-col"]').filter({ hasText: 'Paso 2: Respuesta' }).last();
    await expect(step2).toBeVisible();
    await expect(step2.getByText('Una vez que hayas creado la transacción, aquí encontrarás los datos de respuesta generados por el proceso.')).toBeVisible();
    const codeStep2 = step2.locator('pre').filter({ hasText: '"vci":' }).first();
    await expect(codeStep2).toBeVisible();
    const textStep3 = await codeStep2.textContent();
    const expectedKeys = [
      '"vci":', '"amount":', '"status":', '"buy_order":', '"session_id":',
      '"card_detail":', '"card_number":', '"accounting_date":', '"transaction_date":',
      '"authorization_code":', '"payment_type_code":', '"response_code":',
      '"installments_amount":', '"installments_number":', '"balance":'
    ];
    for (const key of expectedKeys) {
      expect(textStep3).toContain(key);
    }
  }
}
