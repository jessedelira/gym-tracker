import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { hash } from 'bcrypt';
import { prisma } from '~/server/db';

interface UserDto {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

export const userRouter = createTRPCRouter({
	createUser: publicProcedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
				firstName: z.string(),
				lastName: z.string(),
				emojiMoode: z.string()
			}),
		)
		.mutation(async ({ input }) => {
			const hashedPassword = await hash(input.password, 10);

			const createdUser = await prisma.user.create({
				data: {
					username: input.username,
					password: hashedPassword,
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});

			const userDto: UserDto = {
				id: createdUser.id,
				username: createdUser.username,
				firstName: createdUser.firstName,
				lastName: createdUser.lastName,
			};

			return userDto;
		}),

	getUser: protectedProcedure
		.input(z.object({ username: z.string() }))
		.query(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: {
					username: input.username,
				},
			});

			if (!user) {
				throw new Error('User not found');
			}

			const userDto: UserDto = {
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
			};

			return userDto;
		}),

	updateUser: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				newUsername: z.string(),
				newFirstName: z.string(),
				newLastName: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const updatedUser = await prisma.user.update({
				where: {
					id: input.id,
				},
				data: {
					firstName: input.newFirstName,
					lastName: input.newLastName,
					username: input.newUsername,
				},
			});

			const userDto: UserDto = {
				id: updatedUser.id,
				username: updatedUser.username,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
			};

			return userDto;
		}),
});
