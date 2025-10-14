import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { EditorPage } from '../src/pages/editorPage';
import { ArticlePage } from '../src/pages/articlePage';
import { MainPage } from '../src/pages/mainPage';

test.describe('Тесты с авторизацией', () => {
  let loginPage;
  let editorPage;
  let articlePage;
  let mainPage;
  let articleSlug = '';
  let commentText = '';
  let testTitle = '';

  test.beforeEach(async ({ page }) => {
    // Инициализируем Page Objects
    loginPage = new LoginPage(page);
    editorPage = new EditorPage(page);
    articlePage = new ArticlePage(page);
    mainPage = new MainPage(page);

    // Логинимся
    await loginPage.goto();
    await loginPage.login('nikitabannikov@bk.ru', 'Seven777');

    // Создаем новую статью
    await editorPage.goto();
    
    const timestamp = Date.now();
    testTitle = `Тестовая статья ${timestamp}`;
    
    articleSlug = await editorPage.createArticle(
      testTitle,
      `Описание ${timestamp}`,
      `Содержание ${timestamp}`,
      `тег${timestamp}`
    );
  });

  test('Создание статьи', async ({ page }) => {
    await editorPage.goto();
    
    const timestamp = Date.now();
    const uniqueTitle = `Новая статья ${timestamp}`;
    
    await editorPage.createArticle(
      uniqueTitle,
      `Описание новой статьи ${timestamp}`,
      `Содержание новой статьи ${timestamp}`,
      `новыйтег${timestamp}`
    );

    await expect(editorPage.contentText).toBeVisible();
  });

  test('Редактирование статьи', async ({ page }) => {
    await articlePage.goto(articleSlug);
    await articlePage.editArticle();
    
    await editorPage.updateArticle('Обновленное название');
    
    await expect(articlePage.updatedTitle).toBeVisible();
  });

  test('Добавить и удалить комментарий', async ({ page }) => {
    await articlePage.goto(articleSlug);
    
    commentText = `Тестовый комментарий ${Date.now()}`;
    
    await articlePage.addComment(commentText);
    await expect(page.getByText(commentText)).toBeVisible();
    
    await articlePage.deleteComment(commentText);
    
    const commentCard = await articlePage.getCommentCard(commentText);
    await expect(commentCard).not.toBeVisible();
  });

  test('Удалить статью', async ({ page }) => {
    await articlePage.goto(articleSlug);
    await articlePage.deleteArticle();
    
    await mainPage.clickGlobalFeed();
    const isArticleVisible = await mainPage.isArticleVisible(testTitle);
    await expect(isArticleVisible).toBe(false);
  });

  test('Поставить лайк', async ({ page }) => {
    await mainPage.goto();
    await mainPage.clickGlobalFeed();
    
    const counter = await mainPage.likeFirstArticle();
    await expect(counter).toHaveText(' ( 1 )');
  });
});