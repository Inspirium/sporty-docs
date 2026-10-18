import { defineConfig } from "cf/config";

export default defineConfig({
	accountId: "fead588365c921330737e4e14ab625e6",
	worker: {
		name: "sporty-docs",
		compatibilityDate: "2026-10-01",
		domains: ["docs.sporty.plus"],
		// Static assets only, no Worker code: every page is pre-rendered by `nuxt generate`,
		// redirects come from dist/_redirects and headers from dist/_headers. An unknown
		// path gets dist/404.html instead of reaching a server-side render that has no
		// D1 binding for @nuxt/content.
		assets: {
			notFoundHandling: "404-page",
		},
	},
});
