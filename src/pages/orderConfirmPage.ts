import { Page, expect } from '@playwright/test';

export class OrderConfirmPage {
  constructor(private page: Page) {}

  async completeOrder() {
    await this.page.click("//a[.='FINISH']");
    await expect(this.page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
  }
}
