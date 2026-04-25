// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const sitemapHiddenPrefixes = [
	'/notes/',
	'/research/',
	'/samples/',
	'/services/',
	'/table/',
	'/work/',
	'/works/',
];

// https://astro.build/config
export default defineConfig({
	site: 'https://atomheart-father.github.io',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname;
				return !sitemapHiddenPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
