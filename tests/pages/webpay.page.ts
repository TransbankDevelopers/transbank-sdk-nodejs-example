import { Page, expect, Locator } from '@playwright/test';

export class WebpayPage {
  readonly page: Page;
  readonly cardButtonClick: Locator;
  readonly cardNumberInput: Locator;
  readonly mainPanel: Locator;
  readonly payButton: Locator;
  readonly rutInput: Locator;
  readonly passwordInput: Locator;
  readonly acceptButton: Locator;
  readonly vciSelect: Locator;
  readonly continueButton: Locator;
  readonly abortButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cardButtonClick = page.getByRole('button', { name: 'Tarjetas Crédito, Débito,' });
    this.cardNumberInput = page.getByRole('textbox', { name: 'Número de tarjeta' });
    this.mainPanel = page.locator('main-panel');
    this.payButton = page.getByRole('button', { name: 'Pagar' });
    this.rutInput = page.locator('#rutClient');
    this.passwordInput = page.locator('#passwordClient');
    this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
    this.vciSelect = page.locator('#vci');
    this.continueButton = page.getByRole('button', { name: 'Continuar' });
    this.abortButton = page.getByRole('button', { name: 'Anular compra y volver' });
  }

  async validateTransactionCreation() {
    const preTag = this.page.locator('pre').filter({ hasText: "{ 'token': '" });
    await expect(preTag).toBeVisible();
    const textContent = (await preTag.textContent()) ?? '';
    expect(textContent).toMatch(/'token':\s*'[^']+'/); // Token not empty
    expect(textContent).toMatch(/'url':\s*'[^']+'/);   // URL not empty
    await this.page.getByRole('button', { name: 'PAGAR' }).click();
  }

  async fillCardInformation(cardNumber: string) {
    await this.cardButtonClick.click();
    await this.cardNumberInput.click();
    await this.cardNumberInput.fill(cardNumber);

    // Click panel to trigger validation/refresh (simulating user action)
    await this.mainPanel.click();

    // Check for error message and fail fast to trigger retry
    const errorMsg = this.page.getByText('Intenta pagar con otra tarjeta');
    if (await errorMsg.isVisible({ timeout: 3000 })) {
      throw new Error('Webpay form : "Intenta pagar con otra tarjeta". Triggering retry.');
    }

    await this.payButton.click();
  }

  async performBankAuthentication(rut: string, password: string, vci: string) {
    await this.rutInput.click();
    await this.rutInput.fill(rut);
    await this.rutInput.press('Tab');
    await this.passwordInput.fill(password);
    await this.acceptButton.click();
    await this.vciSelect.selectOption(vci);
    await this.continueButton.click();
  }

  async abortTransaction() {
    await this.abortButton.click();
  }
}
