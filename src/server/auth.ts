import { type GetServerSidePropsContext } from 'next';
import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
	type User,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/server/db';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { type AdapterUser } from 'next-auth/adapters';

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
			firstName?: string | null;
			lastName?: string | null;
			dateCreated?: Date | null;
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
		firstName?: string | null;
		lastName?: string | null;
		dateCreated?: Date | null;
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
		jwt: async ({ token, user, trigger }) => {
			if (user) {
				token.user = user;
			}
			if (trigger === 'update') {
				// Note: Prisma calls must always be awaited.
				const updatedUser = await prisma.user.findUnique({
					where: {
						id: token.user.id,
					},
				});

				if (updatedUser) {
					const newJWTUser: User | AdapterUser = {
						id: updatedUser.id,
						dateCreated: updatedUser.dateCreated,
						firstName: updatedUser.firstName,
						lastName: updatedUser.lastName,
						username: updatedUser.username,
					};
					token.user = newJWTUser;
				}
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
				// Two Cases on sign in
				// 1. User is found by username
				// 2. User is not found by username

				const userFoundByUsername = await prisma.user.findUnique({
					where: {
						username: credentials?.username,
					},
				});

				if (!userFoundByUsername) {
					throw new Error('Incorrect username or password');
				}

				try {
					const doesInputPwMatchEncryptedPw = bcrypt.compareSync(
						credentials?.password as 'string | Buffer',
						userFoundByUsername?.password as 'string',
					);

					if (doesInputPwMatchEncryptedPw) {
						return userFoundByUsername;
					}
				} catch (error) {
					throw new Error('Incorrect username or password');
				}
				return null;
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
		maxAge: 60 * 60 * 24 * 30, // session, jwt will last for 30 days
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
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
function Awaitable<T>(arg0: null): User | PromiseLike<User | null> | null {
	throw new Error('Function not implemented.');
}

