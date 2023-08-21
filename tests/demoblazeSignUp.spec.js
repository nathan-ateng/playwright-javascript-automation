import { test, expect } from "@playwright/test";
const userName = Math.trunc(Math.random() * 1000000000000000).toString();
const userPassword = "kempachi";
test("Sign Up a new user", async ({ page }) => {
  test.slow();

  await page.goto("https://demoblaze.com/"); // launch website
  await page.click("#signin2"); // click signup
  await page.fill("#sign-username", userName); // fill in random user name
  await page.fill("#sign-password", userPassword); // fill in password

  page.on("dialog", (dialog) => {
    // Handle alert
    expect(dialog.message()).toBe("Sign up successful.");
    dialog.accept();
  });
  await page.click("//button[normalize-space()='Sign up']"); // click signup
  await page.waitForTimeout(5000);

  // Login with created user
  await page.click("#login2");
  await page.fill("#loginusername", userName);
  await page.fill("#loginpassword", userPassword);
  await page.click("//button[normalize-space()='Log in']");
  await page.waitForTimeout(5000);

  // Expect page title and page url
  await expect(page).toHaveTitle("STORE");
  await expect(page).toHaveURL("https://demoblaze.com/");
  await expect(await page.locator("//a[@id='nameofuser']").textContent()).toBe(
    `Welcome ${userName}`
  );
});

// test("Login with newly created user", async({page})=>{
//   await page.goto()
// })
