/**
 * Utility function to import theme CSS styles in components
 * Should be called once when the Graph module is initialized
 */
export const importThemeStyles = (): void => {
  try {
    // Import CSS file
    import('../styles/theme.css');
    console.log('Graph theme styles loaded');
  } catch (error) {
    console.error('Failed to load Graph theme styles:', error);
  }
};

export default importThemeStyles;