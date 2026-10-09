import { bindings, defineConfig } from "cf/config";

export default defineConfig({
	accountId: "fead588365c921330737e4e14ab625e6",
	worker: {
		name: "sporty-docs",
		compatibilityDate: "2026-10-01",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: ".output/server/index.mjs",
		domains: ["docs.sporty.plus"],
		// Nitro pre-renders /api as a meta-refresh page, which assets would serve
		// with a 200; let the Worker answer first so the routeRules 301 applies.
		assets: {
			runWorkerFirst: ["/api", "/api/*"],
		},
		env: {
			ASSETS: bindings.assets(),
		},
	},
});
