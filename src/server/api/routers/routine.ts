import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
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

	getRoutines: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(({ input }) => {
			const routines = prisma.routine.findMany({
				where: {
					userId: input.userId,
				},
			});

			return routines;
		}),

	getActiveRoutine: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(({ input }) => {
			const routine = prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			return routine;
		}),
});
