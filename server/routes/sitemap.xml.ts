import { Configuration, SitemapApi } from '@flyo/nitro-typescript'

const escapeXml = (value: string) => value.replace(/[&<>"']/g, (char) => {
  switch (char) {
    case '&': return '&amp;'
    case '<': return '&lt;'
    case '>': return '&gt;'
    case '"': return '&quot;'
    default: return '&apos;'
  }
})

// `useFlyoSitemap()` only runs inside the Nuxt app, where the Flyo plugin has
// configured the SDK — it is not available in a Nitro route. So talk to the
// SitemapApi directly, using the credentials the module put on the runtime
// config.
export default defineEventHandler(async (event) => {
  const { flyo, siteUrl } = useRuntimeConfig(event).public

  const items = await new SitemapApi(new Configuration({
    apiKey: flyo.apiToken,
    ...(flyo.apiBasePath ? { basePath: flyo.apiBasePath } : {}),
  })).sitemap()

  const origin = (siteUrl || getRequestURL(event).origin).replace(/\/+$/, '')

  const urls = items
    // An item without an `href` has no reachable URL. `href` is also where
    // mail links show up as `mailto:…`, which are not pages — only keep the
    // internal paths.
    .filter(item => item.href?.startsWith('/'))
    .map(item => ({
      loc: `${origin}${item.href}`,
      // `updated_at` is a Unix timestamp of the last content change, made for
      // `lastmod` — a rebuild that produces identical output does not move it.
      lastmod: item.updated_at
        ? new Date(item.updated_at * 1000).toISOString()
        : undefined,
    }))

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const body = urls.map(({ loc, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    '  </url>',
  ].join('\n')).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
})
