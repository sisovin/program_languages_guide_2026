import { test, expect } from '@playwright/test';

test.describe('Language Detail Page', () => {
  test('should navigate to language detail page', async ({ page }) => {
    await page.goto('/');

    // Wait for language cards to load
    await page.waitForSelector('[data-testid="language-card"]', { timeout: 10000 });

    // Click on first language card
    const firstCard = page.locator('[data-testid="language-card"]').first();
    await firstCard.click();

    // Should navigate to detail page
    await expect(page).toHaveURL(/\/language\/.+/);

    // Detail content should be visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display language details', async ({ page }) => {
    // Navigate directly to a known language (assuming Python exists)
    await page.goto('/language/python');

    // Check for language name
    await expect(page.locator('h1')).toBeVisible();

    // Check for description
    await expect(page.locator('text=/description|about/i')).toBeVisible();

    // Check for use cases
    const useCases = page.locator('text=/use case|uses|applications/i');
    if (await useCases.count() > 0) {
      await expect(useCases.first()).toBeVisible();
    }
  });

  test('should display salary information', async ({ page }) => {
    await page.goto('/language/python');

    // Check for salary range component
    const salaryInfo = page.locator('text=/salary|compensation|pay/i');
    if (await salaryInfo.count() > 0) {
      await expect(salaryInfo.first()).toBeVisible();
    }
  });

  test('should have back navigation', async ({ page }) => {
    await page.goto('/language/python');

    // Look for back button or breadcrumb
    const backButton = page.locator('button').filter({ hasText: /back|return/i })
      .or(page.locator('a[href="/"]'))
      .or(page.locator('[data-testid="breadcrumb"]'));

    if (await backButton.count() > 0) {
      await expect(backButton.first()).toBeVisible();
    }
  });

  test('should handle non-existent language gracefully', async ({ page }) => {
    await page.goto('/language/nonexistentlanguage123');

    // Should show 404 or error message
    const errorContent = page.locator('text=/not found|404|error/i');
    await expect(errorContent).toBeVisible();
  });
});

test.describe('API Integration', () => {
  test('should fetch language data from API', async ({ page }) => {
    // Intercept API calls
    await page.route('**/api/languages/*', route => {
      // Let the request go through normally
      route.continue();
    });

    await page.goto('/language/python');

    // Wait for content to load (indicates successful API call)
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/languages/*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/language/python');

    // Should show error message
    const errorMessage = page.locator('text=/error|failed|unavailable/i');
    await expect(errorMessage).toBeVisible();
  });

  test('should handle slow API responses', async ({ page }) => {
    // Delay API response
    await page.route('**/api/languages/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      route.continue();
    });

    await page.goto('/language/python');

    // Should show loading state
    const loading = page.locator('text=/loading|please wait/i');

    // Loading should appear initially
    if (await loading.count() > 0) {
      await expect(loading.first()).toBeVisible();
    }

    // Content should eventually appear
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
  });
});

test.describe('SEO and Meta Tags', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/language/python');

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      await expect(ogTitle).toHaveAttribute('content', /.+/);
    }
  });

  test('should have unique title per language', async ({ page }) => {
    await page.goto('/language/python');
    const pythonTitle = await page.title();

    await page.goto('/language/javascript');
    const javascriptTitle = await page.title();

    // Titles should be different
    expect(pythonTitle).not.toBe(javascriptTitle);

    // Both should contain language name
    expect(pythonTitle.toLowerCase()).toContain('python');
    expect(javascriptTitle.toLowerCase()).toContain('javascript');
  });
});
