export class EditorPage {

  constructor(page) {
    this.page = page;
    this.titleInput = page.locator('[placeholder="Article Title"]');
    this.descriptionInput = page.locator('[placeholder="What\'s this article about?"]');
    this.contentInput = page.locator('[placeholder="Write your article (in markdown)"]');
    this.tagsInput = page.locator('[placeholder="Enter tags"]');
    this.publishButton = page.locator('button:has-text("Publish Article")');
    this.updateButton = page.locator('button:has-text("Update Article")');
  }

  async goto() {
    await this.page.goto('https://realworld.qa.guru/#/editor');
  }

  async createArticle(title, description, content, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.contentInput.fill(content);
    await this.tagsInput.fill(tags);
    await this.publishButton.click();
    await this.page.waitForURL(/\/article\//);
    
    return this.page.url().split('/article/')[1]; // возвращаем slug
  }

  async updateArticle(newTitle) {
    await this.titleInput.fill(newTitle);
    await this.updateButton.click();
  }

}