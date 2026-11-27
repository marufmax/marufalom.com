import siteMetadata from '@/data/siteMetadata'

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // Same date on the build server and in every browser, so hydration matches.
    timeZone: 'UTC',
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate
