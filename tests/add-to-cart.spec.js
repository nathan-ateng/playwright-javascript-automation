import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";

test("add item to cart", async ({ page }) => {
  // Log into application
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login("nate2", "kempachi");

  // Choose item
  await page.click("//a[normalize-space()='Samsung galaxy s6']");
  // Check for poduct name
  await expect(
    await page
      .locator("//h2[normalize-space()='Samsung galaxy s6']")
      .textContent()
  ).toBe("Samsung galaxy s6");

  page.on("dialog", async (dialog) => {
    // handle error alert
    expect(dialog.type()).toContain("alert"); // expect dialog to be an alert
    expect(dialog.message()).toBe("Product added."); // expect error message
    await dialog.accept();
  });
  await page.click("//a[normalize-space()='Add to cart']");
  const products = await page.$$("#tbodyid h4 ");
  console.log(products);
  //await page.waitForTimeout(5000);
});
