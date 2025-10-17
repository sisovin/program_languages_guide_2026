/**
 * Accessibility Utilities
 * Helper functions for WCAG 2.1 AA compliance
 */

/**
 * Generate unique ID for ARIA attributes
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if color contrast ratio meets WCAG AA standards (4.5:1 for normal text)
 * Note: This is a simplified check. Use a proper contrast checker tool for production.
 */
export function getLuminance(hexColor: string): number {
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAG_AA(color1: string, color2: string, isLargeText: boolean = false): boolean {
  const ratio = getContrastRatio(color1, color2);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Announce message to screen readers using ARIA live region
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof window === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Trap focus within a modal/dialog for keyboard navigation
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Get appropriate ARIA role for an element based on its purpose
 */
export function getSemanticRole(purpose: 'navigation' | 'main' | 'complementary' | 'banner' | 'contentinfo' | 'search' | 'form' | 'region'): string {
  const roles: Record<string, string> = {
    navigation: 'navigation',
    main: 'main',
    complementary: 'complementary',
    banner: 'banner',
    contentinfo: 'contentinfo',
    search: 'search',
    form: 'form',
    region: 'region',
  };

  return roles[purpose] || 'region';
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Format number for screen readers (e.g., $50,000 -> "50 thousand dollars")
 */
export function formatForScreenReader(value: number, type: 'currency' | 'number' = 'number'): string {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Add keyboard navigation handler for custom interactive elements
 */
export function addKeyboardHandler(
  element: HTMLElement,
  onClick: () => void,
  options: { enter?: boolean; space?: boolean } = { enter: true, space: true }
) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((options.enter && e.key === 'Enter') || (options.space && e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  element.setAttribute('tabindex', '0');

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}
