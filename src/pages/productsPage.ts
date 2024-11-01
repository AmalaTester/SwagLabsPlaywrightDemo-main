import { Page, expect } from '@playwright/test';
import waitUntil from 'webdriverio/build/commands/browser/waitUntil';

export class ProductsPage {
  constructor(private page: Page) { }

  //Method to add items to cart
  async addItemToCart(productStr: string, productLstMap: Map<string, string>) {
    const productData = productLstMap;
    let count = productData.size+1;
    if (productData.size == 0) {
      count = 1;
    }
    console.log("Count::::::" + count);
    for (const product of productStr.trim().split('|')) {
      console.log(product.trim());
      const addToCartBtn = this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).getByRole('button', { name: 'ADD TO CART' });
      await addToCartBtn.click();
      await expect(this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).getByRole('button'), "Add to cart button not changed Remove btn!").toHaveText('REMOVE');
      await expect(await this.page.locator('.shopping_cart_badge')).toHaveText(count.toString());
      this.verifyImageLoaded(product.trim());
      productData.set(product.trim(), await this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).locator('div.inventory_item_price').textContent() || '');
      count++;
    }
    console.log(productData);
    return productData;
  }

  //Method to remove specified from cart
  async removeItemFromCart(productStr: string, itemsInCartMap: Map<string, string>) {
    const productData: Map<string, string> = itemsInCartMap;
    let count = parseInt(await this.page.locator('.shopping_cart_badge').textContent() || '');
    console.log(count);
    for (const product of productStr.trim().split('|')) {
      console.log(product.trim());
      const removeFromCartBtn = this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).getByRole('button', { name: 'REMOVE' });
      await removeFromCartBtn.click();
      await expect(this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).getByRole('button'), "Remove button not changed Add to cart btn!").toHaveText('ADD TO CART');
      count--;
      await expect(await this.page.locator('.shopping_cart_badge')).toHaveText(count.toString());
      productData.delete(product.trim());
    }
    return productData;
  }

  async verifyImageLoaded(product: string) {
    const img = await this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).locator('img.inventory_item_img');
    //console.log(img);
    await expect(img,"Image loding not complete.").toHaveJSProperty('complete', true,{timeout:10000 });
    await expect(img, "Image of the product not loaded in products page!").not.toHaveJSProperty('naturalWidth', 0);
  }

  //Method to add item by clicking on their image
  async addItemToCartByClickingProductImage(productStr: string, productLstMap: Map<string, string>) {
    const productData = productLstMap;
    let count = productData.size+1;
    if (productData.size == 0) {
      count = 1;
    }
    console.log("Count::::::" + count);
    for (const product of productStr.trim().split('|')) {
      console.log(product.trim());
      this.verifyImageLoaded(product.trim());
      await this.page.locator('div.inventory_item').filter({ hasText: product.trim() }).locator('img.inventory_item_img').click();
      const addToCartBtn = this.page.locator('div.inventory_details').filter({ hasText: product.trim() }).getByRole('button', { name: 'ADD TO CART' });
      await addToCartBtn.click();
      await expect(this.page.locator('div.inventory_details').filter({ hasText: product.trim() }).getByRole('button',{name:'REMOVE'}), "Add to cart button not changed Remove btn!").toBeVisible();
      await expect(this.page.getByRole('img')).not.toHaveJSProperty('naturalWidth', 0);
      await expect(await this.page.locator('.shopping_cart_badge')).toHaveText(count.toString());
      productData.set(product.trim(), await this.page.locator('div.inventory_details').filter({ hasText: product.trim() }).locator('div.inventory_details_price').textContent() || '');
      count++;
      await this.page.getByRole('button', { name: '<- Back' }).click();
      await expect(this.page,"Page not traversed to Inventory page.").toHaveURL(/inventory/);
    }
    console.log(productData);
    return productData;
  }

}
