import { prisma } from '~/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const completedSessionRouter = createTRPCRouter({
	createCompletedSession: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				sessionId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// 1. find session by id
			const activeSession = await prisma.activeSession.findFirst({
				where: {
					sessionId: input.sessionId,
				},
			});

			if (!activeSession) {
				throw new Error('Session not found');
			}

			// TODO: calculate percentage of workouts completed
			// calculate percentage of workouts completed
			// const compiledWorkouts = await prisma.workout.findMany({
			//     where: {
			//         sessionId: input.sessionId,
			//     },
			// });

			// const workoutsCompleted = compiledWorkouts.filter((workout) => {
			//     return workout.isCompletedOnActiveSession;
			// });

			// const percentageCompleted = workoutsCompleted.length / compiledWorkouts.length;

			const createdCompletedSession =
				await prisma.completedSession.create({
					data: {
						startedAt: activeSession.startedAt,
						percentageCompleted: 1,
						sessionId: input.sessionId,
						userId: input.userId,
					},
				});

			// delete from active session
			await prisma.activeSession.delete({
				where: {
					id: activeSession.id,
				},
			});

			return createdCompletedSession;
		}),

	getListOfCompletedSessionIdsForActiveRoutine: protectedProcedure
		.input(z.object({ currentDate: z.date() }))
		.query(async ({ input, ctx }) => {
			const userTimezone = ctx.session.user.userSetting?.timezone.iana ?? 'UTC';

			// Create start of day in user's timezone
			const startOfDayUTC = new Date(input.currentDate.toLocaleString('en-US', {
				timeZone: userTimezone,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
			}));

			startOfDayUTC.setHours(0, 0, 0, 0);

			// End of day is start of day + 24 hours
			const endOfDayUTC = new Date(startOfDayUTC);
			endOfDayUTC.setHours(24, 0, 0, 0);

			const sessionsOnActiveRoutine = await prisma.session.findMany({
				where: {
					userId: ctx.session.user.id,
						routine: {
							isActive: true,
						},
					},
				});

			const completedSessionIds = await prisma.completedSession.findMany({
				select: {
					sessionId: true,
				},
				where: {
					userId: ctx.session.user.id,
					sessionId: {
						in: sessionsOnActiveRoutine.map(
							(session) => session.id,
						),
					},
					completedAt: {
						gte: startOfDayUTC,
						lt: endOfDayUTC,
					},
				},
			});

			return completedSessionIds.map((session) => session.sessionId);
		}),
});
