import { Page, Locator } from '@playwright/test';

export class WebpayPage {
  readonly page: Page;
  // Webpay form selectors
  readonly cardButtonClick: Locator;
  readonly cardNumberInput: Locator;
  readonly mainPanel: Locator;
  readonly payButton: Locator;
  readonly abortButton: Locator;
  
  // Transbank response selectors
  readonly rutInput: Locator;
  readonly passwordInput: Locator;
  readonly acceptButton: Locator;
  readonly vciSelect: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Selectores de Webpay
    this.cardButtonClick = page.getByRole('button', { name: 'Tarjetas Crédito, Débito,' });
    this.cardNumberInput = page.getByRole('textbox', { name: 'Número de tarjeta' });
    this.mainPanel = page.locator('main-panel'); 
    this.payButton = page.getByRole('button', { name: 'Pagar' });
    this.abortButton = page.getByRole('button', { name: 'Anular compra y volver' });
    
    // Selectores del Banco
    this.rutInput = page.locator('#rutClient');
    this.passwordInput = page.locator('#passwordClient');
    this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
    this.vciSelect = page.locator('#vci');
    this.continueButton = page.getByRole('button', { name: 'Continuar' });
  }

  async payWithCard(cardNumber: string) {
    await this.cardButtonClick.click();
    await this.cardNumberInput.click();
    await this.cardNumberInput.fill(cardNumber);
    await this.mainPanel.click();
    await this.payButton.click();
  }

  async performBankSimulation(rut: string, pass: string, vci: 'TSY' | 'TSN' = 'TSY') {
    await this.rutInput.fill(rut);
    await this.passwordInput.fill(pass);
    await this.acceptButton.click();
    
    await this.vciSelect.selectOption(vci);
    await this.continueButton.click();
  }

  async abortTransaction() {
    await this.abortButton.click();
  }
}