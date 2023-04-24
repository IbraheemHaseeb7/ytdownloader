/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				hoveringColor: '#646cff'
			},
			borderColor: '#646cff'
		}
	},
	plugins: []
};
