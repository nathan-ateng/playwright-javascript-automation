import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { CartPage } from "../pages/cartPage.js";

test("add item to cart", async ({ page }) => {
  // Log into application
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login("nate2", "kempachi");

  // add item to cart
  const cart = new CartPage(page);
  await cart.addProduct("Sa7");
  await page.waitForTimeout(5000);
});
