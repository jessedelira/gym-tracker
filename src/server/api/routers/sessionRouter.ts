import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from '~/server/db';

export const sessionRouter = createTRPCRouter({
	createSession: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				userId: z.string(),
				description: z.string(),
				days: z.string().array(),
			}),
		)
		.mutation(async ({ input }) => {
			const createdSession = await prisma.session.create({
				data: {
					name: input.name,
					description: input.description,
					userId: input.userId,
				},
			});

			await Promise.all(
				input.days.map(async (day) => {
					await prisma.sessionDaysActive.create({
						data: {
							day: day,
							sessionId: createdSession.id,
						},
					});
				}),
			);

			return createdSession;
		}),

	getAllSessions: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const sessions = await prisma.session.findMany({
				where: {
					userId: input.userId,
				},
			});
			return sessions;
		}),

	getSessionsAddedToCurrentActiveRoutine: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ input }) => {
			const activeRoutine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			if (!activeRoutine) {
				return null;
			}

			const sessionsRelatedToActiveRoutine =
				await prisma.session.findMany({
					where: {
						routineId: activeRoutine.id,
					},
					include: {
						days: true,
					},
				});

			return sessionsRelatedToActiveRoutine;
		}),

	getSessionsThatAreNotAddedToActiveRoutine: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ input }) => {
			// Check if there is an active routine
			const activeRoutine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			if (!activeRoutine) {
				return null;
			}

			const sessionsNotAddedToActiveRoutine =
				await prisma.session.findMany({
					where: {
						AND: [
							{ userId: input.userId },
							{
								OR: [
									{ routineId: null },
									{
										routineId: {
											not: {
												equals: activeRoutine.id,
											},
										},
									},
								],
							},
						],
					},
				});

			return sessionsNotAddedToActiveRoutine;
		}),

	deleteSession: protectedProcedure
		.input(z.object({ sessionId: z.string() }))
		.mutation(async ({ input }) => {
			await prisma.session.delete({
				where: {
					id: input.sessionId,
				},
			});
		}),

	getSessionsThatAreActiveOnDate: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				date: z.date(),
			}),
		)
		.query(async ({ input }) => {
			const dayMap = [
				'sunday',
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday',
			];

			const sessions = await prisma.session.findMany({
				select: {
					id: true,
					name: true,
				},
				where: {
					userId: input.userId,
					days: {
						some: {
							day: dayMap[input.date.getDay()],
						},
					},
					routine: {
						isActive: true,
					},
				},
			});

			return sessions;
		}),
});
