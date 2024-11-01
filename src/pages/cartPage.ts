import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Method to navigate to the cart page
  async goToCart() {
    await this.page.click('.shopping_cart_badge');
    await expect(this.page).toHaveURL(/cart/);
  }

  // Method to verify items in Cart
  async verifyItemsInCart(productStr:string,productData:Map<string,string>) {
    for(const product of productStr.split('|')){
      await expect(this.page.locator('.cart_item').filter({ hasText: product })).toBeVisible();
      let priceInCart= await this.page.locator('.cart_item').filter({ hasText: product }).locator('div.inventory_item_price').textContent();
      console.log(priceInCart+":::"+productData.get(product));
      await expect(productData.get(product)?.includes(priceInCart||''),"Price not matches for "+product+": Price in cart: "+priceInCart+" price in inventory:"+productData.get(product)).toBeTruthy();
    }
  }

  //Method to remove items from cart
  async removeItemsFromCart(productStr:string,itemsInCartMap:Map<string, string>) {
    const productData :Map<string, string>= itemsInCartMap;
    for(const product of productStr.split('|')){
      const removeFromCartBtn = this.page.locator('div.cart_item').filter({ hasText: product }).getByRole('button', { name: 'REMOVE' });
      await removeFromCartBtn.click();
      productData.delete(product.trim());
    }
    return productData;
  }

  //Method to continue shopping
  async continueShopping() {
    await this.page.getByRole('link',{name:'CONTINUE SHOPPING'}).click();
    await expect(this.page,"Continue shopping didnt traversed to inventory page!").toHaveURL(/inventory/);
  }

}
