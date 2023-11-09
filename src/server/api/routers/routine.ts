import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
} from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const routineRouter = createTRPCRouter({
	createRoutine: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(({ input }) => {
			const createdRoutine = prisma.routine.create({
				data: {
					name: input.name,
					description: input.description,
					userId: input.userId,
				},
			});

            return createdRoutine;
		}),
});
