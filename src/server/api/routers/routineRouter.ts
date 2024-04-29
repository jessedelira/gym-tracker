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
		.query(async ({ input }) => {
			const routine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			return routine;
		}),

	setActiveRoutine: protectedProcedure
		.input(z.object({ routineId: z.string() }))
		.mutation(async ({ input }) => {
			// Set all routines to inactive, just in case
			await prisma.routine.updateMany({
				where: {
					isActive: true,
				},
				data: {
					isActive: false,
				},
			});

			// Set the selected routine to active
			const routine = await prisma.routine.update({
				where: {
					id: input.routineId,
				},
				data: {
					isActive: true,
				},
			});

			return routine;
		}),

	addSessionToActiveRoutine: protectedProcedure
		.input(
			z.object({
				sessionId: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// update the session to be related to the active routine
			const currentActiveRoutine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			await prisma.session.update({
				where: {
					id: input.sessionId,
				},
				data: {
					routineId: currentActiveRoutine?.id,
				},
			});

			return await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
				include: {
					sessions: {},
				},
			});
		}),
});
