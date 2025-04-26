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
		.query(async ({ input, ctx }) => {
			const userTimezone =
				ctx.session.user.userSetting?.timezone.iana ?? 'UTC';

			// Convert input date to user's timezone
			const userDate = new Date(
				input.date.toLocaleString('en-US', {
					timeZone: userTimezone,
				}),
			);

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
					description: true,
				},
				where: {
					userId: input.userId,
					days: {
						some: {
							day: dayMap[userDate.getDay()],
						},
					},
					routine: {
						isActive: true,
					},
				},
			});

			return sessions;
		}),

	getSessionById: protectedProcedure
		.input(
			z.object({
				sessionId: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const session = await prisma.session.findUnique({
				where: {
					id: input.sessionId,
				},
				include: {
					days: true,
					workouts: {
						include: {
							exercise: true,
						},
					},
				},
			});

			if (!session) {
				throw new Error('Session not found');
			}

			// Verify user owns this session
			if (session.userId !== ctx.session.user.id) {
				throw new Error('Unauthorized');
			}

			return session;
		}),

	updateSession: protectedProcedure
		.input(
			z.object({
				sessionId: z.string(),
				name: z.string(),
				description: z.string(),
				days: z.string().array(),
				workouts: z.array(
					z.object({
						exerciseId: z.string(),
						weightLbs: z.number().optional(),
						reps: z.number().optional(),
						sets: z.number().optional(),
						durationSeconds: z.number().optional(),
					}),
				),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			// Delete existing days and workouts
			await prisma.sessionDaysActive.deleteMany({
				where: { sessionId: input.sessionId },
			});
			await prisma.workout.deleteMany({
				where: { sessionId: input.sessionId },
			});

			// Update session
			const updatedSession = await prisma.session.update({
				where: { id: input.sessionId },
				data: {
					name: input.name,
					description: input.description,
					days: {
						create: input.days.map((day) => ({
							day: day,
						})),
					},
					workouts: {
						create: input.workouts.map((workout) => ({
							exerciseId: workout.exerciseId,
							weightLbs: workout.weightLbs,
							reps: workout.reps,
							sets: workout.sets,
							durationSeconds: workout.durationSeconds,
							userId: ctx.session.user.id,
						})),
					},
				},
				include: {
					days: true,
					workouts: true,
				},
			});

			return updatedSession;
		}),

	getSessionsThatAreNotAddedToRoutine: protectedProcedure.query(
		async ({ ctx }) => {
			return ctx.prisma.session.findMany({
				where: {
					userId: ctx.session.user.id,
					routineId: null,
				},
				include: {
					days: true,
				},
			});
		},
	),
});
