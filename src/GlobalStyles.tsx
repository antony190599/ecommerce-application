import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Base colors */
    --color-primary: ${ props => props.theme.colors.primary};
    --color-primary-light: ${ props => props.theme.colors.primaryLight};
    --color-primary-lighter: ${ props => props.theme.colors.primaryLighter};
    --color-primary-medium: ${ props => props.theme.colors.primaryMedium};
    --color-secondary: ${ props => props.theme.colors.secondary};
    --color-accent: ${ props => props.theme.colors.accent};
    --color-text: ${ props => props.theme.colors.text};
    --color-text-light: ${ props => props.theme.colors.textLight};
    --color-background: ${ props => props.theme.colors.background};
    --color-white: ${ props => props.theme.colors.white};
    --color-black: ${ props => props.theme.colors.black};
    --color-gray-100: ${ props => props.theme.colors.gray100};
    --color-gray-200: ${ props => props.theme.colors.gray200};
    --color-gray-300: ${ props => props.theme.colors.gray300};
    --color-gray-400: ${ props => props.theme.colors.gray400};
    --color-gray-500: ${ props => props.theme.colors.gray500};
    --color-gray-600: ${ props => props.theme.colors.gray600};
    --color-error: ${ props => props.theme.colors.error};
    --color-success: ${ props => props.theme.colors.success};
    
    /* Spacing */
    --spacing-xs: ${ props => props.theme.spacing.xs};
    --spacing-sm: ${ props => props.theme.spacing.sm};
    --spacing-md: ${ props => props.theme.spacing.md};
    --spacing-lg: ${ props => props.theme.spacing.lg};
    --spacing-xl: ${ props => props.theme.spacing.xl};
    --spacing-xxl: ${ props => props.theme.spacing.xxl};
    
    /* Border radius */
    --border-radius-sm: ${ props => props.theme.borderRadius.sm};
    --border-radius-md: ${ props => props.theme.borderRadius.md};
    --border-radius-lg: ${ props => props.theme.borderRadius.lg};
    
    /* Shadows */
    --shadow-sm: ${ props => props.theme.shadows.sm};
    --shadow-md: ${ props => props.theme.shadows.md};
    --shadow-lg: ${ props => props.theme.shadows.lg};
    
    /* Fonts */
    --font-family: ${ props => props.theme.typography.fontFamily};
    --font-weight-regular: ${ props => props.theme.typography.fontWeight.regular};
    --font-weight-medium: ${ props => props.theme.typography.fontWeight.medium};
    --font-weight-bold: ${ props => props.theme.typography.fontWeight.bold};
    
    /* Transitions */
    --transition-fast: ${ props => props.theme.transitions.fast};
    --transition-medium: ${ props => props.theme.transitions.medium};
    
    /* Z-index layers */
    --z-index-dropdown: ${ props => props.theme.zIndex.dropdown};
    --z-index-sticky: ${ props => props.theme.zIndex.sticky};
    --z-index-modal: ${ props => props.theme.zIndex.modal};
    --z-index-popover: ${ props => props.theme.zIndex.popover};
    --z-index-tooltip: ${ props => props.theme.zIndex.tooltip};

    font-family: var(--font-family);
    line-height: 1.5;
    font-weight: var(--font-weight-regular);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Set default colors */
    color: var(--color-text);
    background-color: var(--color-background);
  }
  
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }
  
  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }
  
  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.6;
  }
  
  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  
  a:hover {
    color: var(--color-secondary);
  }
  
  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }
  
  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  
  /* Remove animations for people who've turned them off */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
  }
  
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }
  
  /* Form elements */
  // input, textarea, select {
  //   padding: var(--spacing-sm) var(--spacing-md);
  //   border: 1px solid var(--color-gray-300);
  //   border-radius: var(--border-radius-sm);
  //   width: 100%;
  //   transition: border-color var(--transition-fast);
  // }
  
  // input:focus, textarea:focus, select:focus {
  //   outline: none;
  //   border-color: var(--color-primary);
  // }
  
  /* Responsive breakpoints */
  @media (max-width: 576px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
  }
  
`;

export default GlobalStyles;
