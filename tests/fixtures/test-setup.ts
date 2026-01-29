import { test as base } from '@playwright/test';
import { TbkDevelopersExamplePage } from '../pages/tbkdevelopers-example.page';
import { WebpayPage } from '../pages/webpay.page'; // Importación correcta

// Definimos los tipos para el autocompletado en los tests
type MyFixtures = {
  tbkDevelopersExamplePage: TbkDevelopersExamplePage;
  webpayPage: WebpayPage; // Nombre alineado con el negocio
};

export const test = base.extend<MyFixtures>({
  tbkDevelopersExamplePage: async ({ page }, use) => {
    await use(new TbkDevelopersExamplePage(page));
  },
  webpayPage: async ({ page }, use) => {
    await use(new WebpayPage(page));
  },
});

export { expect } from '@playwright/test';