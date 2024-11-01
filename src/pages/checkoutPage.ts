import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    await this.page.click("//a[.='CHECKOUT']");
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async fillOutCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click("input[value='CONTINUE']");
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }
}
