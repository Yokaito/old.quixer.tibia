import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  nextThemes: {
    defaultTheme: 'dark',
  },
  logo: <span>Quixer</span>,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  project: {
    link: 'https://github.com/Yokaito/quixer',
  },
  docsRepositoryBase: 'https://github.com/Yokaito/quixer/tree/main/apps/docs',
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: '%s – Quixer Docs',
      }
    }
  },
  head: (
    <>
      <title>Quixer Documentation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Quixer Documentation" />
      <meta
        property="og:description"
        content="Welcome to the Quixer documentation."
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  banner: {
    key: '2.0-release',
    text: (
      <p>
        🎉 We are thrilled to introduce Quixer, a package with components to
        your website tibia
      </p>
    ),
  },
}

export default config
