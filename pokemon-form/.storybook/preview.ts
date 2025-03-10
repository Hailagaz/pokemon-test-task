// import type { Preview } from '@storybook/react'

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//        color: /(background|color)$/i,
//        date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;

// .storybook/preview.ts
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/index.css';

export const decorators = [
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark',
		},
		defaultTheme: 'light',
	}),
];

export const parameters = {
	backgrounds: {
		default: 'light',
		values: [
			{ name: 'light', value: '#ffffff' },
			{ name: 'dark', value: '#1a1a1a' },
		],
	},
	docs: {
		theme: {
			base: 'light',
			brandTitle: 'Luna Edge Storybook',
			brandUrl: 'https://storybook.newskit.co.uk/',
			brandImage: '../src/assets/logos/LunaEdgeLogo.svg',
		},
	},
};