exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = "#login2";
    this.userInput = "#loginusername";
    this.userPassword = "#loginpassword";
    this.loginBtn = "//button[normalize-space()='Log in']";
    this.productList = "#tbodyid div div div h4 a";
    this.addToCartBtn = "//a[normalize-space()='Add to cart']";
  }
  async gotoLoginPage() {
    await this.page.goto("https://demoblaze.com/");
  }

  async login(userName, userPassword) {
    await this.page.click(this.loginLink);
    await this.page.fill(this.userInput, userName);
    await this.page.fill(this.userPassword, userPassword);
    await this.page.click(this.loginBtn);
  }
};
