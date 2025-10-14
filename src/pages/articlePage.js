export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('.container h1');
    this.editArticleButton = page.locator('button:has-text("Edit Article")').first();
    this.deleteArticleButton = page.locator('button:has-text("Delete Article")').first();
    this.commentInput = page.locator('[placeholder="Write a comment..."]');
    this.postCommentButton = page.locator('button:has-text("Post Comment")');
    this.updatedTitle = page.getByText('Обновленное название');
  }

  async goto(slug) {
    await this.page.goto(`https://realworld.qa.guru/#/article/${slug}`);
  }

  async getCommentCard(commentText) {
    return this.page.locator('.card', { hasText: commentText });
  }

  async deleteComment(commentText) {
    const commentCard = await this.getCommentCard(commentText);
    const cardFooter = commentCard.locator('.card-footer');
    const deleteButton = cardFooter.locator('button.btn-outline-secondary');
    
    this.page.once('dialog', dialog => dialog.accept());
    await deleteButton.click();
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  async editArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.deleteArticleButton.click();
    await this.page.waitForURL('https://realworld.qa.guru/#/');
  }
}