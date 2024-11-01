
import { test, expect } from '../fixtures/testFixtures';
import { screenshotAfterTest } from '../fixtures/screenshotHook';

test.afterEach(screenshotAfterTest);

let ItemsInCart = new Map<string, string>();
test.describe('Verify the all basic functional flow of saucedemo.com portal.', () => {
   test.afterEach(() => {
    ItemsInCart.clear();
  });
  //Test case 1: Verify whether a user can checkout product without issues
  test('Verify whether a user is able to checkout the products without any issues.', async ({ loginPage, productsPage, cartPage, checkoutPage, orderConfirmPage,baseURL }) => {
    await test.step('Login to the application', async () => {
      await loginPage.navigate(baseURL||'');
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Add items to the cart', async () => {
      ItemsInCart = await productsPage.addItemToCart('Sauce Labs Backpack|Sauce Labs Fleece Jacket',ItemsInCart);
    });
    await test.step('Go to the cart page', async () => {
      await cartPage.goToCart();
      await cartPage.verifyItemsInCart('Sauce Labs Backpack|Sauce Labs Fleece Jacket', ItemsInCart);
    });
    await test.step('Checkout and complete order', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillOutCheckoutInfo('John', 'Doe', '12345');
      await orderConfirmPage.completeOrder();
    });

  });
  // Test case 2: Verify adding & removing products on the product page and checkout
  test('Verify whether a user is able add & remove the products in cart on product page and proceed to checkout without any issues.', async ({ loginPage, productsPage, cartPage, checkoutPage, orderConfirmPage,baseURL }) => {
    await test.step('Login to the application', async () => {
      await loginPage.navigate(baseURL||'');
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Add items to the cart', async () => {
      ItemsInCart = await productsPage.addItemToCart('Sauce Labs Backpack|Sauce Labs Fleece Jacket',ItemsInCart);
    });
    await test.step('Remove items to the cart', async () => {
      ItemsInCart = await productsPage.removeItemFromCart('Sauce Labs Backpack',ItemsInCart);
      console.log(ItemsInCart);
    });
    await test.step('Go to the cart page', async () => {
      await cartPage.goToCart();
      await cartPage.verifyItemsInCart('Sauce Labs Fleece Jacket', ItemsInCart);
    });
    await test.step('Checkout and complete order', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillOutCheckoutInfo('John', 'Doe', '12345');
      await orderConfirmPage.completeOrder();
    });

  });

  // Test case 3: Verify remove operation on the cart page
  test('Verify whether a user is able perform remove operation on cart page.', async ({ loginPage, productsPage, cartPage, checkoutPage, orderConfirmPage,baseURL }) => {
    await test.step('Login to the application', async () => {
      await loginPage.navigate(baseURL||'');
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Add items to the cart', async () => {
      ItemsInCart = await productsPage.addItemToCart('Sauce Labs Backpack|Sauce Labs Fleece Jacket',ItemsInCart);
    });
    await test.step('Remove items from the cart', async () => {
      await cartPage.goToCart();
      ItemsInCart = await cartPage.removeItemsFromCart('Sauce Labs Backpack',ItemsInCart);
      console.log(ItemsInCart);
    });
    await test.step('Continue shopping and add new items to cart.', async () => {
      await cartPage.continueShopping();
      ItemsInCart = await productsPage.addItemToCart('Sauce Labs Bike Light',ItemsInCart);
      await cartPage.goToCart();
      await cartPage.verifyItemsInCart('Sauce Labs Fleece Jacket|Sauce Labs Bike Light', ItemsInCart);
    });
    await test.step('Checkout and complete order', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillOutCheckoutInfo('John', 'Doe', '12345');
      await orderConfirmPage.completeOrder();
    });

  });

  //Test case 4: Verify adding products by clicking image and checkout
  test('Verify whether a user is able to add products by clicking the image and checkout without any issues.', async ({ loginPage, productsPage, cartPage, checkoutPage, orderConfirmPage,baseURL }) => {
    await test.step('Login to the application', async () => {
      await loginPage.navigate(baseURL||'');
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Add items to the cart', async () => {
      ItemsInCart = await productsPage.addItemToCartByClickingProductImage('Sauce Labs Backpack|Sauce Labs Fleece Jacket',ItemsInCart);
    });
    await test.step('Go to the cart page', async () => {
      await cartPage.goToCart();
      await cartPage.verifyItemsInCart('Sauce Labs Backpack|Sauce Labs Fleece Jacket', ItemsInCart);
    });
    await test.step('Checkout and complete order', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillOutCheckoutInfo('John', 'Doe', '12345');
      await orderConfirmPage.completeOrder();
    });

  });

  //Test case 5: Verify that all menu options work without issues
  test('Verify whether all the main menu option works without any issues.', async ({ loginPage, productsPage, cartPage,mainMenuPage,baseURL }) => {
    await test.step('Login to the application', async () => {
      await loginPage.navigate(baseURL||'');
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Click all items menu option while in cart page', async () => {
      ItemsInCart = await productsPage.addItemToCartByClickingProductImage('Sauce Labs Backpack|Sauce Labs Fleece Jacket',ItemsInCart);
      await cartPage.goToCart();
      await mainMenuPage.openMenu();
      await mainMenuPage.selectMenuOption('All Items');
    });
    await test.step('Add items to the cart and reinstate the state of the cart', async () => {
      await cartPage.goToCart();
      await mainMenuPage.openMenu();
      await mainMenuPage.selectMenuOption('Reset App State');
    });
    await test.step('check Logout works', async () => {
      await mainMenuPage.selectMenuOption('Logout');
    });
    await test.step('Check \'About\' option works fine', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await mainMenuPage.openMenu();
      await mainMenuPage.selectMenuOption('About');
    });

  });
});
