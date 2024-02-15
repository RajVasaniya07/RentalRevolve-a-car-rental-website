/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '375px',
			s: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
		},
		extend: {
			colors: {
				orange: 'hsl(26, 100%, 55%)',
				paleOrange: 'hsl(25, 100%, 94%)',
				veryDarkBlue: 'hsl(220, 13%, 13%)',
				darkGrayishBlue: 'hsl(219, 9%, 45%)',
				grayishBlue: 'hsl(220, 14%, 75%',
				lightGrayishBlue: 'hsl(223, 64%, 98%)',
			},
		},
	},
	plugins: [],
};
