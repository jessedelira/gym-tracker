import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

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

	getRoutineCountByUserId: protectedProcedure.query(async ({ ctx }) => {
		const count = await prisma.session.count({
			where: {
				userId: ctx.session.user.id,
			},
		});

		return count;
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

	removeActiveRoutine: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ input }) => {
			const routine = await prisma.routine.updateMany({
				where: {
					userId: input.userId,
					isActive: true,
				},
				data: {
					isActive: false,
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
					sessions: {
						include: {
							days: true,
						},
					},
				},
			});
		}),

	removeSessionFromActiveRoutine: protectedProcedure
		.input(
			z.object({
				sessionId: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// update the session to be related to the active routine
			const removedSession = await prisma.session.update({
				where: {
					id: input.sessionId,
				},
				data: {
					routineId: null,
				},
				include: {
					days: true,
				},
			});

			return removedSession;
		}),

	getRoutineById: protectedProcedure
		.input(
			z.object({
				routineId: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const routine = await ctx.prisma.routine.findUnique({
				where: { id: input.routineId },
				include: {
					sessions: {
						include: {
							days: true,
						},
					},
				},
			});

			if (!routine || routine.userId !== ctx.session.user.id) {
				throw new Error('Routine not found or unauthorized');
			}

			return routine;
		}),

	updateRoutine: protectedProcedure
		.input(
			z.object({
				routineId: z.string(),
				name: z.string(),
				description: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return ctx.prisma.routine.update({
				where: { id: input.routineId },
				data: {
					name: input.name,
					description: input.description,
				},
			});
		}),

	addSessionToRoutine: protectedProcedure
		.input(
			z.object({
				routineId: z.string(),
				sessionId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return ctx.prisma.routine.update({
				where: { id: input.routineId },
				data: {
					sessions: {
						connect: { id: input.sessionId },
					},
				},
			});
		}),

	removeSessionFromRoutine: protectedProcedure
		.input(
			z.object({
				routineId: z.string(),
				sessionId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return ctx.prisma.routine.update({
				where: { id: input.routineId },
				data: {
					sessions: {
						disconnect: { id: input.sessionId },
					},
				},
			});
		}),
});
