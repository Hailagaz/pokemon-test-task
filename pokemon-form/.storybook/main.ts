// import type { StorybookConfig } from '@storybook/react-vite';
// import '../src/index.css' // Ensure global styles are applied

// const config: StorybookConfig = {
//   "stories": [
//     "../src/**/*.mdx",
//     "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-essentials",
//     "@storybook/addon-onboarding",
//     "@chromatic-com/storybook",
//     "@storybook/experimental-addon-test"
//   ],
//   "framework": {
//     "name": "@storybook/react-vite",
//     "options": {}
//   }
// };
// export default config;

// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import '../src/index.css' // Ensure global styles are applied

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
};
export default config;
