import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';
import { Performance } from 'perf_hooks';
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
			// 20 Salt Rounds was not performant enough for me, although it is more secure. It does take upt to 10 seconds for a user to confirm that their account is being created.
		
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
