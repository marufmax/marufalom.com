const siteMetadata = {
  title: 'Maruf Alom',
  author: 'Maruf Alom',
  headerTitle: 'maruf.blog',
  description:
    'Backend engineer in Dhaka. PHP, Go, AI agents and automation. Building Zardo and HypeBox.',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://maruf.blog',
  siteRepo: 'https://github.com/marufmax/marufalom.com',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/opengraph.png',
  email: 'talk.maruf@gmail.com',
  github: 'https://github.com/marufmax',
  twitter: 'https://twitter.com/nothingsecurity',
  linkedin: 'https://www.linkedin.com/in/marufalom',
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
