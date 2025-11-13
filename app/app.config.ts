export default defineAppConfig({
  socials: {
    x: 'https://x.com/Sporty_Plus',
    linkedin: 'https://linkedin.com/company/sportyplus',
    android: 'https://play.google.com/store/apps/details?id=plus.tenis.app&hl=en&gl=US',
    apple: 'https://apps.apple.com/hr/app/sportyplus/id1619337469',
    gmail: 'mailto:info@sporty.plus'
  },
  toc: {
    // Rename the title of the table of contents
    title: 'On this page',
    // Add a bottom section to the table of contents
    bottom: {
      title: 'SportyPlus',
      links: [{
        icon: 'sporty-favicon',
        label: 'SportyPlus',
        to: 'https://www.sporty.plus/',
        target: '_blank'
      }]
    }
  }
})
