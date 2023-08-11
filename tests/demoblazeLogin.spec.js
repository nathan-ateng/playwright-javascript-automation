import { test, expect } from "@playwright/test";
test("Successful login", async ({ page }) => {
  await page.goto("https://demoblaze.com/index.html"); // load login page

  await page.locator("#login2").click(); // login link
  await page.fill("#loginusername", "nate2"); // fill in username
  await page.fill("#loginpassword", "kempachi"); // fill in password
  await page.click("//button[normalize-space()='Log in']"); // click login button

  await expect(page).toHaveTitle("STORE");
  await expect(page).toHaveURL("https://demoblaze.com/index.html");
});
