import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { 
		adapter: adapter(),
		alias: {
			"@/*": "./src/lib/*",
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/404') {
					return;
				}
				if (referrer) {
					console.warn(`Prerendering failed for ${path} from ${referrer}: ${message}`);
				} else {
					console.warn(`Prerendering failed for ${path}: ${message}`);
				}
			}
		}
	 },
	extensions: ['.svelte', '.svx']
};

export default config;
