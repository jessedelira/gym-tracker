import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { api } from '~/utils/api';

import '~/styles/globals.css';
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<title>Gym Tracker</title>
				<meta
					name="description"
					content="Open-source fitness tracking app"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />
				<link
					rel="mask-icon"
					href="/icons/mask-icon.svg"
					color="#FFFFFF"
				/>
				<meta name="theme-color" content="#ffffff" />
				<link
					rel="apple-touch-icon"
					href="/icons/touch-icon-iphone.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/icons/touch-icon-ipad.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/touch-icon-iphone-retina.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="167x167"
					href="/icons/touch-icon-ipad-retina.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="https://yourdomain.com" />
				<meta name="twitter:title" content="Gym Tracker" />
				<meta
					name="twitter:description"
					content="Open-source fitness tracking app"
				/>
				<meta name="twitter:image" content="/icons/twitter.png" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Gym Tracker" />
				<meta
					property="og:description"
					content="Open-source fitness tracking app"
				/>
				<meta property="og:site_name" content="Gym Tracker" />
				<meta property="og:url" content="https://yourdomain.com" />
				<meta property="og:image" content="/icons/og.png" />
				{/* add the following only if you want to add a startup image for Apple devices. */}
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_2048.png"
					sizes="2048x2732"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_1668.png"
					sizes="1668x2224"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_1536.png"
					sizes="1536x2048"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_1125.png"
					sizes="1125x2436"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_1242.png"
					sizes="1242x2208"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_750.png"
					sizes="750x1334"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/images/apple_splash_640.png"
					sizes="640x1136"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="viewport"
					content="initial-scale=1, viewport-fit=cover, user-scalable=no"
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
			</Head>
			<SpeedInsights />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
