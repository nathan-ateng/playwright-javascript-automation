import { test, expect } from "@playwright/test";
const userName = "nate2";
test.describe("Testing login functionality", () => {
  test("Successful login", async ({ page }) => {
    await page.goto("https://demoblaze.com/index.html"); // load login page

    await page.locator("#login2").click(); // login link
    await page.fill("#loginusername", "nate2"); // fill in username
    await page.fill("#loginpassword", "kempachi"); // fill in password
    await page.click("//button[normalize-space()='Log in']"); // click login button

    // Expect page to have title and URL
    await expect(page).toHaveTitle("STORE");
    await expect(page).toHaveURL("https://demoblaze.com/index.html");
  });
  test("Failed login - wrong user name", async ({ page }) => {
    await page.goto("https://demoblaze.com/index.html"); // load login page

    await page.locator("#login2").click(); // click login link
    await page.fill("#loginusername", "akwangimana"); // fill in username
    await page.fill("#loginpassword", "kempachi"); //fill in password

    page.on("dialog", async (dialog) => {
      // handle error alert
      expect(dialog.type()).toContain("alert"); // expect dialog to be an alert
      expect(dialog.message()).toBe("User does not exist."); // expect error message
    });
    await page.click("//button[normalize-space()='Log in']"); // click login button
    await page.waitForTimeout(5000);
  });

  test("Failed login - wrong password", async ({ page }) => {
    await page.goto("https://demoblaze.com/index.html"); // load login page

    await page.locator("#login2").click(); // click login link
    await page.fill("#loginusername", "nate2"); // fill in username
    await page.fill("#loginpassword", "kempach"); // fill in password

    page.on("dialog", async (dialog) => {
      // handle error alert
      expect(dialog.type()).toContain("alert"); // expect dialog to be an alert
      expect(dialog.message()).toBe("Wrong password."); // expect error message
      await dialog.accept();
    });
    await page.click("//button[normalize-space()='Log in']"); // click login button
    await page.waitForTimeout(5000);
  });
});
