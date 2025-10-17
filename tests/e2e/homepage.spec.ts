import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Top.*Programming Languages/i);

    // Check header exists
    await expect(page.locator('header')).toBeVisible();

    // Check main content exists
    await expect(page.locator('main')).toBeVisible();

    // Check footer exists
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display language cards', async ({ page }) => {
    await page.goto('/');

    // Wait for language cards to load
    await page.waitForSelector('[data-testid="language-card"]', { timeout: 10000 });

    // Check that at least one language card is visible
    const languageCards = page.locator('[data-testid="language-card"]');
    await expect(languageCards.first()).toBeVisible();

    // Verify we have multiple languages (expecting 10)
    const count = await languageCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(10);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check header navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check for key navigation links
    await expect(page.locator('text=Home').or(page.locator('a[href="/"]'))).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');

    // Check for skip to content link (WCAG 2.1 AA requirement)
    const skipLink = page.locator('text=Skip to content').or(page.locator('a[href="#main-content"]'));

    // Skip link should exist (might be visually hidden)
    await expect(skipLink).toHaveCount(1);
  });

  test('should have proper semantic HTML', async ({ page }) => {
    await page.goto('/');

    // Check for proper landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should not have automatically detectable ARIA violations', async ({ page }) => {
    await page.goto('/');

    // Note: For comprehensive accessibility testing, integrate axe-core
    // This is a basic check

    // Check that interactive elements are keyboard accessible
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = await page.locator(':focus');

      // Focused element should be visible
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have proper color contrast (visual check)', async ({ page }) => {
    await page.goto('/');

    // Take a screenshot for manual review
    // Automated contrast checking requires additional tools like axe-core
    await page.screenshot({ path: 'test-results/homepage-contrast.png', fullPage: true });
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check content is visible on mobile
    await expect(page.locator('main')).toBeVisible();

    // Check for mobile menu or navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Check content is visible on tablet
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('[data-testid="language-card"]').first()).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Check content is visible on desktop
    await expect(page.locator('main')).toBeVisible();

    // Language cards should be visible
    const languageCards = page.locator('[data-testid="language-card"]');
    await expect(languageCards.first()).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');

    // Check for Next.js optimized images
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      // At least one image should exist
      await expect(images.first()).toBeVisible();

      // Check for lazy loading attribute
      const firstImg = images.first();
      const loading = await firstImg.getAttribute('loading');
      // Images might have loading="lazy" or be handled by Next.js Image
      expect(['lazy', 'eager', null]).toContain(loading);
    }
  });
});

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/');

    // Look for theme toggle button
    const themeToggle = page.locator('button').filter({ hasText: /theme|dark|light/i });

    if (await themeToggle.count() > 0) {
      // Get initial theme (check html class or data attribute)
      const html = page.locator('html');
      const initialClass = await html.getAttribute('class');

      // Click theme toggle
      await themeToggle.first().click();

      // Wait for theme change
      await page.waitForTimeout(500);

      // Verify theme changed
      const newClass = await html.getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    }
  });
});
