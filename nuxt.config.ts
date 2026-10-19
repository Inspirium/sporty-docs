// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineNuxtConfig({
  ssr: true,
  // Not installed: pnpm-workspace.yaml overrides @nuxt/devtools away.
  devtools: { enabled: false },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui", "@nuxtjs/i18n"],
  // Docus switches the strategy to `prefix`, so every page lives under its locale
  // (/en/…, /hr/…, /fr/…); the routeRules below redirect the old unprefixed URLs.
  // Docus ships no Croatian UI strings, so modules/docus-hr-locale.ts adds them.
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English" },
      { code: "hr", name: "Hrvatski" },
      { code: "fr", name: "Français" },
    ],
  },
  content: {
    experimental: {
      nativeSqlite: true,
    },
  },
  ogImage: {
    enabled: false,
  },
  site: {
    name: 'SportyPlus',
    url: 'https://docs.sporty.plus',
  },
  sitemap: {
    // Build it at prerender time: the Worker has no D1 binding, so at runtime
    // @nuxt/content finds no pages and the sitemap comes out as an empty urlset.
    zeroRuntime: true,
  },
  mcp: {
    enabled: false,
  },
  hooks: {
    // The static preset ends _redirects with a Pages-style `/* /404.html 404` fallback,
    // which Workers static assets rejects as invalid; `notFoundHandling: "404-page"` in
    // cloudflare.config.ts does that job. Registered here so it runs after the preset's
    // own `compiled` hook has written the file.
    'nitro:init': (nitro) => {
      nitro.hooks.hook('compiled', async () => {
        const path = join(nitro.options.output.dir, '_redirects')
        const redirects = await readFile(path, 'utf8')
        await writeFile(path, redirects.split('\n').filter(line => !line.startsWith('/* ')).join('\n') + '\n')
      })
    },
  },
    nitro: {
        // A fully static site (`nuxt generate`), deployed as an assets-only Worker with
        // `cf deploy` (cloudflare.config.ts). There is no server code at runtime: a
        // server-side render would query @nuxt/content's D1 database, which doesn't
        // exist, and log a handful of errors for every 404. Redirects and headers below
        // are written to dist/_redirects and dist/_headers.
        preset: 'cloudflare_pages_static',
        prerender: {
            // Served by a nuxt-agent-discovery server route that the crawler never
            // reaches, since no page links to it.
            routes: ['/.well-known/api-catalog'],
        },
        routeRules: {
            '/.well-known/api-catalog': {
                headers: {
                    'Content-Type': 'application/linkset+json; charset=utf-8',
                    'Cache-Control': 'public, max-age=3600',
                },
            },
            // The old external API is no longer documented; its links land on OAuth.
            // Only the removed pages: an '/api/**' rule would also catch
            // /api/__sitemap__/urls, which the sitemap reads its URLs from.
            '/api': { redirect: { to: '/en/oauth', statusCode: 301 } },
            '/api/courts': { redirect: { to: '/en/oauth', statusCode: 301 } },
            '/api/reservations': { redirect: { to: '/en/oauth', statusCode: 301 } },
            '/api/users': { redirect: { to: '/en/oauth', statusCode: 301 } },
            // Every page is under a locale prefix and there is no index.html at the root.
            '/': { redirect: { to: '/en', statusCode: 302 } },
            // Pages moved under /en when the docs gained translations; the CMS, the
            // blog and the AI chat still link to the old paths.
            ...Object.fromEntries(['getting-started', 'interface', 'website', 'members', 'oauth'].flatMap(section => [
                [`/${section}`, { redirect: { to: `/en/${section}`, statusCode: 301 } }],
                [`/${section}/**`, { redirect: { to: `/en/${section}/:splat`, statusCode: 301 } }],
            ])),
            '/**': {
                headers: {
                    'X-Clacks-Overhead': 'GNU Terry Pratchett',
                    'X-Jobs': 'Want to works with us? Contact us at info@sporty.plus'
                }
            }
        }
    },
    llms: {
        domain: 'https://www.sporty.plus',
        title: 'SportyPlus',
        description: 'Sports management platform',
        full: {
            title: 'SportyPlus',
            description: 'Sports management platform',
        },
    },
    icon: {
        customCollections: [
            {
                prefix: "sporty",
                dir: "app/assets/icons",
            }
            ]
    }
})
