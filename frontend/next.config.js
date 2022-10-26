/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@simplewebauthn/browser']) // pass the modules you would like to see transpiled

module.exports = withTM({
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'by-BY']
  },
  reactStrictMode: true,
  swcMinify: true
})
