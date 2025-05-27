import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Base colors */
    --color-primary: #4a69bd;
    --color-secondary: #1e3799;
    --color-accent: #fa8231;
    --color-text: #2c3e50;
    --color-text-light: #7f8c8d;
    --color-background: #f9f9f9;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-gray-100: #f7f7f7;
    --color-gray-200: #e6e6e6;
    --color-gray-300: #d1d1d1;
    --color-error: #e74c3c;
    --color-success: #2ecc71;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
    
    /* Border radius */
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 1rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
    
    /* Fonts */
    --font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* Z-index layers */
    --z-index-dropdown: 1000;
    --z-index-sticky: 1020;
    --z-index-modal: 1030;
    --z-index-popover: 1040;
    --z-index-tooltip: 1050;

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
  
  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }
  
  /* Grid system */
  .grid {
    display: grid;
    gap: var(--spacing-md);
  }
  
  /* Buttons */
  .btn {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-lg);
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: background-color var(--transition-fast);
  }
  
  .btn:hover {
    background-color: var(--color-secondary);
  }
  
  .btn-accent {
    background-color: var(--color-accent);
  }
  
  .btn-accent:hover {
    background-color: #e67e22;
  }
  
  /* Form elements */
  input, textarea, select {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius-sm);
    width: 100%;
    transition: border-color var(--transition-fast);
  }
  
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  
  /* Responsive breakpoints */
  @media (max-width: 576px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
  }
  
  @media (min-width: 768px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 992px) {
    .grid-cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .grid-cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default GlobalStyles;
