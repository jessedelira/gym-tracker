import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

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
        <title>My Page Title</title>
        <meta name="description" content="My page description" />
		<link rel="manifest" href="/manifest.json"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
