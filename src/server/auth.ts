import { type GetServerSidePropsContext } from 'next';
import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/server/db';
import Credentials from 'next-auth/providers/credentials';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			username?: string | null;
			// ...other properties
			// role: UserRole;
		};
		// expires: ISODateString;
	}

	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		username?: string | null;
		// ...other properties
		// role: UserRole;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			username?: string | null;
			// ...other properties
			// role: UserRole;
		};
		// expires: ISODateString;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.user = user;
			}
			return token;
		},
		session: ({ session, token }) => {
			session.user = token.user;
			return session;
		},
		redirect({ url, baseUrl }) {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: {
						username: credentials?.username,
					},
				});
				if (user) {
					console.log('User with ${credentials.username} was found.');
					return user;
				} else {
					console.log(
						'No user was found with the ${credentials.username} username.',
					);
					return null;
				}
			},
		}),
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
	session: {
		maxAge: 60 * 60, // session,jwt will last for 1 hour
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/signin',
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
