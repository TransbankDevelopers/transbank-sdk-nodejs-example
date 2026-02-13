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
}
