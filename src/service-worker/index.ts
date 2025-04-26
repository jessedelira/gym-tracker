import { defaultCache } from '@serwist/next/worker';
import { Serwist, type PrecacheEntry } from 'serwist';

declare const self: ServiceWorkerGlobalScope & {
	// Change this attribute's name to your `injectionPoint`.
	// `injectionPoint` is an InjectManifest option.
	// See https://serwist.pages.dev/docs/build/inject-manifest/configuring
	__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
}).addEventListeners();
