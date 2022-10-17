/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@simplewebauthn/browser']) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "by-BY"],
    defaultLocale: "en-US",
  },
})
