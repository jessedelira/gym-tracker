import { type GetServerSidePropsContext } from 'next';
import {
	getServerSession,
	type NextAuthOptions,
	type DefaultSession,
	type User as NextAuthUser,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/server/db';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { type Prisma, type UserPreference } from '@prisma/client';

// Define a custom User type that extends NextAuth's User
interface User extends NextAuthUser {
	id: string;
	name?: string | null;
	username?: string | null;
	firstName?: string | null;
	lastName?: string | null;
	dateCreated?: Date | null;
	userPreferences?: UserPreference[] | null;
	userSetting?: Prisma.UserSettingGetPayload<{
		include: { timezone: true };
	}> | null;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: User;
		// expires: ISODateString;
	}

	interface User {
		id: string;
		name?: string | null;
		username?: string | null;
		firstName?: string | null;
		lastName?: string | null;
		dateCreated?: Date | null;
		userPreferences?: UserPreference[] | null;
		userSetting?: Prisma.UserSettingGetPayload<{
			include: { timezone: true };
		}> | null;
		// ...other properties
		// role: UserRole;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: {
			id: string;
			name?: string | null;
			username?: string | null;
			firstName?: string | null;
			lastName?: string | null;
			dateCreated?: Date | null;
			userPreferences?: UserPreference[] | null;
			userSetting?: Prisma.UserSettingGetPayload<{
				include: { timezone: true };
			}> | null;
			// ...other properties
			// role: UserRole;
		};
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
					include: {
						userPreferences: true,
					},
				});

				if (updatedUser) {
					token.user = updatedUser;
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
			async authorize(credentials): Promise<User | null> {
				if (!credentials?.username || !credentials?.password) {
					throw new Error('Missing credentials');
				}

				const userFoundByUsername = await prisma.user.findUnique({
					where: {
						username: credentials?.username,
					},
					include: {
						userPreferences: true,
						userSetting: {
							include: {
								timezone: true,
							},
						},
					},
				});

				if (!userFoundByUsername) {
					throw new Error('Incorrect username or password');
				}

				try {
					const doesInputPwMatchEncryptedPw = bcrypt.compareSync(
						credentials?.password ?? '',
						userFoundByUsername?.password ?? '',
					);

					if (doesInputPwMatchEncryptedPw) {
						const returnUser: User = {
							id: userFoundByUsername.id,
							username: userFoundByUsername.username,
							firstName: userFoundByUsername.firstName,
							lastName: userFoundByUsername.lastName,
							dateCreated: userFoundByUsername.dateCreated,
							userPreferences:
								userFoundByUsername.userPreferences,
							userSetting: userFoundByUsername.userSetting,
						};

						console.log('returnUser', returnUser.userSetting);

						return returnUser;
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
