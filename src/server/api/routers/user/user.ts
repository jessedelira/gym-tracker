import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

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
			console.log(input);
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
});
