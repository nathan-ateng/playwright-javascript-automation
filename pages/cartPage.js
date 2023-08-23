export const CartPage = class CartPagePage {
  constructor(page) {
    this.page = page;
    this.productList = "#tbodyid div div div h4 a";
    this.addToCartBtn = "//a[normalize-space()='Add to cart']";
  }
  async addProduct(productName) {
    const productList = await this.page.$$(this.productList);
    for (const product of productList) {
      if (productName === (await product.textContent())) {
        await product.click();
        break;
      }
      await this.page.on("dialog", async (dialog) => {
        if (dialog.message().includes("added")) {
          await dialog.accept();
        }
      });
    }
    await this.page.locator(this.addToCartBtn).click();
  }
};
