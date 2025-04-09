import { fn } from '@storybook/test';

export const parameters = {
  actions: { 
    // Remove argTypesRegex as it's deprecated in Storybook 8
    // Instead, we'll use explicit action handlers in our stories
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
}; 