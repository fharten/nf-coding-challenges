import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByText('HOME')).toBeVisible();
  });
});

test.describe('Navigate to volumes', () => {
  test('test', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'VOLUMES', exact: true }).click();
    await expect(page).toHaveURL(/\/volumes$/);
    await expect(
      page.getByRole('heading', { name: 'Lord of the Rings' }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be Earth at some time in the distant past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold.",
      ),
    ).toBeVisible();
    await expect(page.getByText('All Volumes')).toBeVisible();
  });
});

test.describe('Navigate to single volume', () => {
  test('test', async ({ page }) => {
    await page.goto('/volumes');
    await page
      .getByRole('link', { name: 'The Fellowship of the Ring' })
      .click();

    await expect(page).toHaveURL('/volumes/the-fellowship-of-the-ring');
    await expect(
      page.getByRole('heading', { name: 'The Fellowship of the Ring' }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "The Fellowship of the Ring is the first volume of J. R. R. Tolkien's epic adventure The Lord of the Rings. It is followed by The Two Towers and The Return of the King.",
      ),
    ).toBeVisible();
  });
});

test('CRUD flow', async ({ page }) => {
  await page.goto('/volumes');

  // CREATE
  await page.getByRole('link', { name: 'Create New Volume' }).click();
  await page
    .getByRole('textbox', { name: 'title', exact: true })
    .fill('The Silmarillion');
  await page
    .getByRole('textbox', { name: /description/i })
    .fill('The Silmarillion Description');
  await page
    .getByRole('textbox', { name: 'cover' })
    .fill('/images/the-return-of-the-king.png');
  await page.getByRole('textbox', { name: 'color' }).fill('#fff');
  await page.getByRole('textbox', { name: 'Book Ordinal' }).fill('Book IX');
  await page
    .getByRole('textbox', { name: 'Book Title' })
    .fill('The Silmarillion');
  await page.getByRole('button', { name: 'Create Volume' }).click();
  await expect(page).toHaveURL(/\/volumes\/the-silmarillion$/);

  // EDIT
  await page.getByRole('link', { name: 'Edit' }).click();
  await expect(page).toHaveURL(/\/volumes\/the-silmarillion\/edit/);
  const descriptionBox = page.getByRole('textbox', { name: /description/i });
  await expect(descriptionBox).toBeVisible({ timeout: 150000 });

  // CHECK DETAILS
  await expect(
    page.getByRole('heading', { name: 'The Silmarillion' }),
  ).toBeVisible();
  await descriptionBox.fill('Updated Description');

  // GO BACK
  await page.goto('/volumes/the-silmarillion');
  await expect(page.getByText(/Updated Description/)).toBeVisible();

  // DELETE
  await page.getByRole('link', { name: 'Delete' }).click();
  await page.getByRole('link', { name: 'Delete' }).click();

  // VERIFY
  await page.goto('/volumes');
  await expect(page.getByText('The Silmarillion')).toHaveCount(0);
});
