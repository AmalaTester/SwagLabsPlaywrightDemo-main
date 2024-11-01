import { Page, expect } from '@playwright/test';

export class MainMenuPage {
  constructor(private page: Page) {}

  // Method to open the side menu
  async openMenu() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click(); // Open the side menu
    await expect(this.page.locator('nav.bm-item-list')).toBeVisible(); // Verify the menu is visible
  }

  // Method to select a menu option by its text
  async selectMenuOption(option: string) {
    const optionSelector = `nav.bm-item-list a:has-text("${option}")`;
    await this.page.click(optionSelector);
    switch(option){
      case 'Logout':
        await expect(this.page).toHaveURL(/\/index/);
        break;
      case 'All Items':
        await expect(this.page).toHaveURL(/\/inventory/);
        break;
    case 'About':
        await expect(this.page).toHaveURL(/\/saucelabs/);
        break;
    case 'Reset App State':
        await expect(this.page.locator('.shopping_cart_badge'),"Shopping cart is not empty!").not.toBeVisible();
        break;
    }
  }

  // Method to verify that the menu is closed
  async closeMenu() {
    await this.page.getByRole('button', { name: 'Close Menu' }).click(); // Click the close button
    await expect(this.page.locator('nav.bm-item-list')).toBeVisible(); // Verify the menu is hidden
  }

  // Method to verify the URL after selecting a menu option
  async verifyUrl(expectedUrl: RegExp) {
    await expect(this.page).toHaveURL(expectedUrl);
   
  }
}