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
        preset: 'cloudflare-pages',
        // With SSR on, every pre-rendered page gets its own _routes.json exclude
        // rule, and Cloudflare caps the file at 100: past the cap Nitro drops
        // the rest, which then hit the Worker and 404 (it has no D1 binding for
        // @nuxt/content). A wildcard per content section keeps it well under.
        cloudflare: {
            pages: {
                routes: {
                    exclude: ['/interface/*', '/images/*', '/raw/*'],
                },
            },
        },
        routeRules: {
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
