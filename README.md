# Docus Default Starter

> A beautiful, minimal starter for creating documentation with Docus

This is the default Docus starter template that provides everything you need to build beautiful documentation sites with Markdown and Vue components.

> [!TIP]
> If you're looking for i18n support, check out the [i18n starter](https://github.com/nuxt-themes/docus/tree/main/.starters/i18n).

## ✨ Features

- 🎨 **Beautiful Design** - Clean, modern documentation theme
- 📱 **Responsive** - Mobile-first responsive design  
- 🌙 **Dark Mode** - Built-in dark/light mode support
- 🔍 **Search** - Full-text search functionality
- 📝 **Markdown Enhanced** - Extended markdown with custom components
- 🎨 **Customizable** - Easy theming and brand customization
- ⚡ **Fast** - Optimized for performance with Nuxt 4
- 🔧 **TypeScript** - Full TypeScript support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Your documentation site will be running at `http://localhost:3000`

## 📁 Project Structure

```
my-docs/
├── content/              # Your markdown content
│   ├── index.md         # Homepage
│   ├── 1.getting-started/  # Getting started section
│   └── 2.essentials/    # Essential documentation
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## ⚡ Built with

This starter comes pre-configured with:

- [Nuxt 4](https://nuxt.com) - The web framework
- [Nuxt Content](https://content.nuxt.com/) - File-based CMS
- [Nuxt UI](https://ui.nuxt.com) - UI components
- [Nuxt Image](https://image.nuxt.com/) - Optimized images
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [Docus Layer](https://www.npmjs.com/package/docus) - Documentation theme

## 📖 Documentation

For detailed documentation on customizing your Docus project, visit the [Docus Documentation](https://docus.dev)

## 🚀 Deployment

The site is a Cloudflare **Worker with static assets** (`sporty-docs` on the Inspirium
account), serving `docs.sporty.plus`. It is deployed with Cloudflare's
[`cf` CLI](https://developers.cloudflare.com/cf/), configured in `cloudflare.config.ts`:

```bash
pnpm exec cf auth login   # once per machine; cf does not reuse a wrangler login
pnpm deploy               # nuxt build, then cf deploy
```

`cf deploy` does not run the Nuxt build itself — it bundles whatever is already in
`.output` — which is why the script builds first. `wrangler.config.ts` only tells `cf`
where the assets are; `cf` still uses Wrangler's bundler, so `wrangler` stays a dev
dependency even though nothing runs it directly.

## 📄 License

[MIT License](https://opensource.org/licenses/MIT) 