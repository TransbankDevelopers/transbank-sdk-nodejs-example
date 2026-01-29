import { Page, expect, Locator } from '@playwright/test';

export class TbkDevelopersExamplePage {
  readonly page: Page;
  readonly payButton: Locator;
  readonly tokenInput: Locator;
  readonly resultPreTag: Locator;

  constructor(page: Page) {
    this.page = page;
    // Elementos específicos del sitio de ejemplo de Transbank Developers
    this.payButton = page.getByRole('button', { name: 'PAGAR' });
    this.tokenInput = page.getByRole('textbox');
    this.resultPreTag = page.locator('pre').filter({ hasText: '{ "vci":' }).first();
  }

  async gotoWebpayPlus() {
    await this.page.goto('/webpay-plus');
  }

  /**
   * Inicia la transacción en el sitio de ejemplo.
   * Valida que se haya generado el token antes de redirigir.
   */
  async initiateTransaction() {
    await expect(this.tokenInput).toBeVisible();
    const token = await this.tokenInput.inputValue();
    expect(token).toBeTruthy(); // Aserción rápida de sanidad
    
    await this.payButton.click();
  }

  /**
   * Valida el JSON de respuesta en la pantalla de "voucher" del sitio de ejemplo.
   */
  async validateTransactionResult(expectedStatus: 'AUTHORIZED' | 'FAILED', responseCode: number) {
    // Validamos que volvimos al sitio de ejemplo buscando el título correcto
    const title = expectedStatus === 'AUTHORIZED' 
      ? 'Webpay Plus - Confirmar transacción' 
      : 'Webpay Plus - Rechazo Bancario';
      
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();

    // Validamos el contenido del JSON mostrado en pantalla
    await expect(this.resultPreTag).toBeVisible();
    const textContent = (await this.resultPreTag.textContent()) || '';
    
    expect(textContent).toContain(`"status": "${expectedStatus}"`);
    expect(textContent).toContain(`"response_code": ${responseCode}`);
  }

  async validateAbortedResult() {
    // Assert age title
    await expect(this.page.getByRole('heading', { name: 'Webpay Plus - Estado de compra cancelada' })).toBeVisible();
    
    // Assert transaction abortion
    const abortPre = this.page.locator('pre').filter({ hasText: '{ "TBK_TOKEN": "' });
    await expect(abortPre).toBeVisible();
    const abortText = (await abortPre.textContent()) ?? '';
    expect(abortText).toMatch(/"TBK_TOKEN":\s*"[^"]+"/);
    expect(abortText).toMatch(/"TBK_ORDEN_COMPRA":\s*"[^"]+"/);
    expect(abortText).toMatch(/"TBK_ID_SESION":\s*"[^"]+"/);
  }
}