import withSerwistInit from '@serwist/next';


/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

const withSerwist = withSerwistInit({
  swSrc: "src/service-worker/index.ts",
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === "development",
  cacheOnNavigation: true
})  


/** @type {import("next").NextConfig} */
const config = withSerwist({
  reactStrictMode: false,
})
export default config;