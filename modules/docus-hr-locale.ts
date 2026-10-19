import { defineNuxtModule, createResolver, extendPages } from '@nuxt/kit'

type DocusLocale = { code: string, name?: string, language?: string }

/**
 * Docus only offers a locale it has UI strings for (its own i18n/locales/*.json),
 * and it has none for Croatian, so it drops `hr` from the language switcher. This
 * registers our own hr.json with @nuxtjs/i18n and puts `hr` back in the list.
 */
export default defineNuxtModule({
  meta: { name: 'docus-hr-locale' },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const hr: DocusLocale = { code: 'hr', name: 'Hrvatski', language: 'hr' }

    nuxt.hook('i18n:registerModule', (register) => {
      register({ langDir: resolve('../i18n/locales'), locales: [{ ...hr, file: 'hr.json' }] })
    })

    nuxt.hook('modules:done', () => {
      const docus = nuxt.options.runtimeConfig.public.docus as { filteredLocales?: DocusLocale[] }
      const configured = (nuxt.options as { i18n?: { locales?: DocusLocale[] } }).i18n?.locales?.map(locale => locale.code) ?? []

      if (docus?.filteredLocales && !docus.filteredLocales.some(locale => locale.code === 'hr')) {
        docus.filteredLocales.push(hr)
        docus.filteredLocales.sort((a, b) => configured.indexOf(a.code) - configured.indexOf(b.code))
      }
    })

    // @nuxtjs/i18n prefixes Docus's `/:lang?` landing route into `/en/:lang?`, which
    // then also matches a section index such as /en/getting-started and renders the
    // landing page there. Pin the parameter to the locale codes so it can't.
    extendPages((pages) => {
      const landing = pages.find(page => page.name === 'lang-index')
      const codes = (nuxt.options as { i18n?: { locales?: DocusLocale[] } }).i18n?.locales?.map(locale => locale.code) ?? []

      if (landing && codes.length) {
        landing.path = `/:lang(${codes.join('|')})?`
      }
    })
  },
})
