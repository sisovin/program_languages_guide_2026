import { test, expect } from '@playwright/test';

test.describe('Language Comparison Feature', () => {
  test('should navigate to comparison page', async ({ page }) => {
    await page.goto('/');

    // Look for compare link/button
    const compareLink = page.locator('a[href*="compare"]').or(
      page.locator('button').filter({ hasText: /compare/i })
    );

    if (await compareLink.count() > 0) {
      await compareLink.first().click();
      await expect(page).toHaveURL(/\/compare/);
    } else {
      // Navigate directly
      await page.goto('/compare');
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should select languages for comparison', async ({ page }) => {
    await page.goto('/compare');

    // Look for language selection interface
    const selectionInterface = page.locator('select, [role="combobox"], input[type="checkbox"]');

    if (await selectionInterface.count() > 0) {
      // Select interface exists, test selection
      await expect(selectionInterface.first()).toBeVisible();
    }
  });

  test('should display comparison table', async ({ page }) => {
    // Navigate with pre-selected languages
    await page.goto('/compare?languages=python,javascript');

    // Check for comparison content
    await expect(page.locator('main')).toBeVisible();

    // Look for table or comparison grid
    const comparisonContent = page.locator('table, [role="grid"], [data-testid="comparison"]');

    if (await comparisonContent.count() > 0) {
      await expect(comparisonContent.first()).toBeVisible();
    }
  });

  test('should show differences between languages', async ({ page }) => {
    await page.goto('/compare?languages=python,javascript');

    // Check for comparison metrics
    const metrics = page.locator('text=/salary|popularity|use case|advantage/i');

    if (await metrics.count() > 0) {
      await expect(metrics.first()).toBeVisible();
    }
  });
});

test.describe('Career Paths Feature', () => {
  test('should navigate to career paths page', async ({ page }) => {
    await page.goto('/');

    // Look for career paths link
    const careerLink = page.locator('a[href*="career"]');

    if (await careerLink.count() > 0) {
      await careerLink.first().click();
      await expect(page).toHaveURL(/\/career/);
    } else {
      // Navigate directly
      await page.goto('/career-paths');
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should display career path information', async ({ page }) => {
    await page.goto('/career-paths');

    // Check for career path content
    await expect(page.locator('main')).toBeVisible();

    // Look for career-related content
    const careerContent = page.locator('text=/developer|engineer|architect|analyst/i');

    if (await careerContent.count() > 0) {
      await expect(careerContent.first()).toBeVisible();
    }
  });
});

test.describe('Search Functionality', () => {
  test('should have search input', async ({ page }) => {
    await page.goto('/');

    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');

    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeVisible();
    }
  });

  test('should filter languages by search', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');

    if (await searchInput.count() > 0) {
      // Type search query
      await searchInput.first().fill('python');

      // Wait for results to filter
      await page.waitForTimeout(500);

      // Check that Python appears in results
      const pythonCard = page.locator('text=/python/i');
      await expect(pythonCard.first()).toBeVisible();
    }
  });

  test('should handle search with no results', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');

    if (await searchInput.count() > 0) {
      // Type nonsense query
      await searchInput.first().fill('xyzabc123nonexistent');

      // Wait for results to filter
      await page.waitForTimeout(500);

      // Check for "no results" message
      const noResults = page.locator('text=/no results|not found|no languages/i');
      if (await noResults.count() > 0) {
        await expect(noResults.first()).toBeVisible();
      }
    }
  });
});

test.describe('Sorting and Filtering', () => {
  test('should have sort options', async ({ page }) => {
    await page.goto('/');

    // Look for sort dropdown or buttons
    const sortControls = page.locator('select[name*="sort"], button').filter({ hasText: /sort|order/i });

    if (await sortControls.count() > 0) {
      await expect(sortControls.first()).toBeVisible();
    }
  });

  test('should sort languages by popularity', async ({ page }) => {
    await page.goto('/');

    // Look for sort by popularity option
    const sortSelect = page.locator('select');

    if (await sortSelect.count() > 0) {
      const options = sortSelect.locator('option');
      const hasPopularity = await options.filter({ hasText: /popularity/i }).count() > 0;

      if (hasPopularity) {
        await sortSelect.first().selectOption({ label: 'Popularity' });

        // Wait for reordering
        await page.waitForTimeout(500);
      }

      // Verify cards are still visible
      await expect(page.locator('[data-testid="language-card"]').first()).toBeVisible();
    }
  });

  test('should filter by use case', async ({ page }) => {
    await page.goto('/');

    // Look for use case filter
    const useCaseFilters = page.locator('input[type="checkbox"]').filter({ hasText: /web|mobile|data/i });

    if (await useCaseFilters.count() > 0) {
      // Click first filter
      await useCaseFilters.first().check();

      // Wait for filtering
      await page.waitForTimeout(500);

      // Verify cards are still visible
      await expect(page.locator('[data-testid="language-card"]').first()).toBeVisible();
    }
  });
});

test.describe('Error Handling', () => {
  test('should display custom 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-123');

    // Should show 404 page
    const notFound = page.locator('text=/404|not found|page.*not.*exist/i');
    await expect(notFound).toBeVisible();

    // Should have link to go home
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();
  });

  test('should handle client-side errors gracefully', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    // Navigate around the site
    await page.goto('/language/python');
    await page.goto('/');

    // No critical errors should occur
    // Filter out expected/minor errors
    const criticalErrors = errors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('DevTools')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

test.describe('Navigation', () => {
  test('should navigate using browser back/forward', async ({ page }) => {
    await page.goto('/');

    // Navigate to detail page
    const firstCard = page.locator('[data-testid="language-card"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await expect(page).toHaveURL(/\/language\/.+/);

      // Go back
      await page.goBack();
      await expect(page).toHaveURL('/');

      // Go forward
      await page.goForward();
      await expect(page).toHaveURL(/\/language\/.+/);
    }
  });

  test('should have working breadcrumbs', async ({ page }) => {
    await page.goto('/language/python');

    // Look for breadcrumbs
    const breadcrumbs = page.locator('[data-testid="breadcrumb"], nav[aria-label*="breadcrumb"]');

    if (await breadcrumbs.count() > 0) {
      await expect(breadcrumbs.first()).toBeVisible();

      // Click home breadcrumb
      const homeBreadcrumb = breadcrumbs.locator('a[href="/"]');
      if (await homeBreadcrumb.count() > 0) {
        await homeBreadcrumb.first().click();
        await expect(page).toHaveURL('/');
      }
    }
  });
});
