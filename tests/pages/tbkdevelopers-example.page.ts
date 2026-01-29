import { Page, expect, Locator } from '@playwright/test';

export class TbkDevelopersExamplePage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly payButton: Locator;
  readonly tokenInput: Locator;
  readonly resultPreTag: Locator;

  constructor(page: Page) {
    this.page = page;
    // Elementos específicos del sitio de ejemplo de Transbank Developers
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
    await expect(this.mainTitle).toHaveText(expectedTitle);
  }

  async initiateTransaction() {
    await expect(this.tokenInput).toBeVisible();
    const token = await this.tokenInput.inputValue();
    expect(token).toBeTruthy();
    
    await this.payButton.click();
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
}