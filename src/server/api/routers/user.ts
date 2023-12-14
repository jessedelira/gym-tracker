import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

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
			}),
		)
		.mutation(async ({ input }) => {
			const hashedPassword = await hash(input.password, 10);

			const createdUser = prisma.user.create({
				data: {
					username: input.username,
					password: hashedPassword,
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});

			return createdUser;
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

			return user;
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
