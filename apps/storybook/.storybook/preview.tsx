import React from 'react';
import type { Preview } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../min-commerce-nextjs/src/GlobalStyles';
import { theme } from 'brick-theme-ui';



export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div
        style={{
          padding: '10px 0',
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;