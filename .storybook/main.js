/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.mdx"
  ],
  "addons": [
    {
      "name": "@storybook/addon-essentials",
      "options": {
        "docs": false
      }
    },
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;