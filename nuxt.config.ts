// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/ui"],
    nitro: {
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
