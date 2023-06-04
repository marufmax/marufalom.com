const siteMetadata = {
  title: 'Maruf Alom',
  author: 'Maruf Alom',
  headerTitle: 'marufalom',
  description: 'Backend Developer',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://marufalom.com',
  siteRepo: 'https://github.com/marufmax/marufalom.com',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/opengraph.webp',
  email: 'hi@marufalom.com',
  github: 'https://github.com/marufmax',
  twitter: 'https://twitter.com/nothingsecurity',
  linkedin: 'https://www.linkedin.com/in/marufalom/',
  locale: 'en-US',
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
