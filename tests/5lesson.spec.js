import { test, expect } from '@playwright/test';

test.describe('Тесты с авторизацией', () => {
  test.beforeEach(async ({ page }) => {
    // Логинимся перед каждым тестом
    await page.goto('https://realworld.qa.guru/#/login');
    
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill('nikitabannikov@bk.ru');

    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill('Seven777');

    await page.locator('button:has-text("Login")').click();

    await page.waitForURL('https://realworld.qa.guru/#/');
  });

  test('Создание статьи', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/#/editor');

    await page.locator('[placeholder="Article Title"]').click();
    await page.locator('[placeholder="Article Title"]').fill('Название строки фр7');

    await page.locator(`[placeholder="What's this article about?"]`).click();
    await page.locator(`[placeholder="What's this article about?"]`).fill('Описание статьи фр7');

    await page.locator('[placeholder="Write your article (in markdown)"]').click();
    await page.locator('[placeholder="Write your article (in markdown)"]').fill('Содержание статьи фр7');

    await page.locator('[placeholder="Enter tags"]').click();
    await page.locator('[placeholder="Enter tags"]').fill('статьяфр7');

    await page.locator('button:has-text("Publish Article")').click();

    await expect(page.getByText('Содержание статьи фр7')).toBeVisible();
  });

  test('Редактирование статьи', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/#/article/------------------7');

    await page.locator('button:has-text("Edit Article")').first().click();

    await page.locator('[placeholder="Article Title"]').click();
    await page.locator('[placeholder="Article Title"]').fill('Я люблю рыбок!');

    await page.locator(`[placeholder="What's this article about?"]`).click();
    await page.locator(`[placeholder="What's this article about?"]`).fill('Статья про то как я люблю рыбок');

    await page.locator('[placeholder="Write your article (in markdown)"]').click();
    await page.locator('[placeholder="Write your article (in markdown)"]').fill('Я очень сильно люблю рыбок!');

    await page.locator('[placeholder="Enter tags"]').click();
    await page.locator('[placeholder="Enter tags"]').fill('рыбки');

    await page.locator('button:has-text("Update Article")').click();
  });

  test('Добавить комментарий', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/#/article/--------------');

    await page.locator('[placeholder="Write a comment..."]').click();
    await page.locator('[placeholder="Write a comment..."]').fill('А мне больше нравятся бабочки!');

    await page.locator('button:has-text("Post Comment")').click();

    await expect(page.locator('.card-block').last().getByText('А мне больше нравятся бабочки!')).toBeVisible();
  });

  test('Удалить комментарий', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/#/article/--------------');

    // Регистрируем обработчик до клика
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept();
    });

    // Удаляем комментарий
    await page.locator('button.btn-outline-secondary').first().click();

    // Проверяем, что комментарий исчез
    await expect(page.locator('.card-block').first()).not.toBeVisible();
  });

  test('test', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/#/article/--------------');

    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await page.locator('button:has-text(" Delete Article")').first().click();
  });
});