import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmPage } from '../pages/orderConfirmPage';
import { MainMenuPage } from '../pages/mainMenuPage';


// Define a custom type for our test fixtures that includes all page objects
type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmPage: OrderConfirmPage;
  mainMenuPage: MainMenuPage;

};

// Extend the base test function to include custom fixtures
export const test = baseTest.extend<MyFixtures>({
  // Create an instance of loginPage for the loginPage fixture
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  // Create an instance of productsPage for the productsPage fixture
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  
  // Create an instance of cartPage for the cartPage fixture
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  
  // Create an instance of checkoutPage for the checkoutPage fixture
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  
  // Create an instance of orderConfirmPage for the orderConfirmPage fixture
  orderConfirmPage: async ({ page }, use) => {
    await use(new OrderConfirmPage(page));
  },
  mainMenuPage: async ({ page }, use) => {
    await use(new MainMenuPage(page));
  }
});

export { expect } from '@playwright/test';
