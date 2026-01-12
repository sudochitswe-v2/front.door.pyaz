/**
 * Theme utility functions for managing app theme colors
 */

/**
 * Updates the theme color meta tag which affects the status bar color on mobile devices
 * @param color - The hex color code to set as the theme color
 */
export const updateThemeColor = (color: string): void => {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', color);
  } else {
    // Create the meta tag if it doesn't exist
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = color;
    document.head.appendChild(meta);
  }

  // Also update the CSS variable for consistent theming
  document.documentElement.style.setProperty('--theme-color', color);
};

/**
 * Gets the current theme color
 * @returns The current theme color as a string
 */
export const getCurrentThemeColor = (): string => {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  return themeColorMeta?.getAttribute('content') || '#7B2CBF'; // Default to primary color
};

/**
 * Applies the default theme color to the status bar
 */
export const applyDefaultTheme = (): void => {
  updateThemeColor('#7B2CBF'); // Purple primary color
};

/**
 * Sets theme color based on device capabilities
 */
export const initializeTheme = (): void => {
  // Apply default theme initially
  applyDefaultTheme();

  // Listen for changes in theme preference (e.g., dark/light mode)
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update theme if user prefers dark mode
    if (mediaQuery.matches) {
      updateThemeColor('#7B2CBF'); // Keep purple theme regardless of system preference
    }
    
    // Listen for changes in system preference
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mediaQuery.addEventListener('change', (_e) => {
      // Maintain app's theme regardless of system preference
      updateThemeColor('#7B2CBF');
    });
  }
};