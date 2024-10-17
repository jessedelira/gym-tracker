import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			height: {
				'110': '28rem', // 448px
				'128': '32rem', // 512px
				'144': '36rem', // 576px
				'160': '40rem', // 640px
				'176': '44rem', // 704px
				'186': '46.5rem', // 744px
				'192': '48rem', // 768px
			},
			colors: {
				// Use hex colors for the best compatibility
				primaryButton: '#4ade80',
			},
		},
		plugins: [],
	},
} satisfies Config;
