import { fileURLToPath } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src/', import.meta.url))
		}
	}
});
