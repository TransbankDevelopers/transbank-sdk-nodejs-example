import { test as base } from '@playwright/test';
import { WebpayPlusPage } from '../pages/webpay-plus.page';
import { WebpayPage } from '../pages/webpay.page';

type MyFixtures = {
  webpayPlusPage: WebpayPlusPage;
  webpayPage: WebpayPage;
};

export const test = base.extend<MyFixtures>({
  webpayPlusPage: async ({ page }, use) => {
    await use(new WebpayPlusPage(page));
  },
  webpayPage: async ({ page }, use) => {
    await use(new WebpayPage(page));
  },
});

export { expect } from '@playwright/test';
