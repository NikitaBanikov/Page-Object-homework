export class LoginPage {

  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[placeholder="Email"]');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.loginButton = page.locator('button:has-text("Login")');
  }

  async goto() {
    await this.page.goto('https://realworld.qa.guru/#/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('https://realworld.qa.guru/#/');
  }
  
}