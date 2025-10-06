export class MainPage {

    constructor(page) {
        this.page = page;
        this.globalFeedTab = page.locator('button:has-text("Global Feed")');
        this.articlePreview = page.locator('.article-preview');
    }

    async goto() {
        await this.page.goto('https://realworld.qa.guru/#/');
    }

    async clickGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async getFirstArticle() {
        return this.articlePreview.first();
    }

    async likeFirstArticle() {
        const article = await this.getFirstArticle();
        const likeButton = article.locator('button.btn-outline-primary');
        await likeButton.click();
        return likeButton.locator('.counter');
    }
    
}