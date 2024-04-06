import withSerwistInit from '@serwist/next';


/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

const withSerwist = withSerwistInit({
  swSrc: "src/service-worker/index.ts",
  swDest: 'public/sw.js',
})  


/** @type {import("next").NextConfig} */
const config = withSerwist({
  reactStrictMode: true,
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'robohash.org',
				pathname: '/**',
			},
		],
	},
})
export default config;
