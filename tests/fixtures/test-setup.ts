import { test as base } from '@playwright/test';
import { WebpayPlusPage } from '../pages/webpay-plus.page';
import { WebpayPage } from '../pages/webpay.page';
import { WebpayPlusMallPage } from '../pages/webpay-plus-mall.page';

type MyFixtures = {
  webpayPlusPage: WebpayPlusPage;
  webpayPage: WebpayPage;
  webpayPlusMallPage: WebpayPlusMallPage;
};

export const test = base.extend<MyFixtures>({
  webpayPlusPage: async ({ page }, use) => {
    await use(new WebpayPlusPage(page));
  },
  webpayPage: async ({ page }, use) => {
    await use(new WebpayPage(page));
  },
  webpayPlusMallPage: async ({ page }, use) => {
    await use(new WebpayPlusMallPage(page));
  },
});

export { expect } from '@playwright/test';
