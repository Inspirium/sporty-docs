// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui"],
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
  },
  mcp: {
    enabled: false,
  },
    nitro: {
        // A Worker with static assets, deployed with `cf deploy` (cloudflare.config.ts).
        // Assets are served before the Worker runs, so pre-rendered pages never
        // reach it — which matters, because it has no D1 binding for @nuxt/content.
        preset: 'cloudflare_module',
        routeRules: {
            // The old external API is no longer documented; its links land on OAuth
            '/api': { redirect: { to: '/oauth', statusCode: 301 } },
            '/api/**': { redirect: { to: '/oauth', statusCode: 301 } },
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
