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

			// Create dates in user's timezone
			const startOfDayCurrentDate = new Date(input.currentDate.toLocaleString('en-US', {
				timeZone: userTimezone
			}));
			startOfDayCurrentDate.setHours(0, 0, 0, 0);

			const endOfDayCurrentDate = new Date(input.currentDate.toLocaleString('en-US', {
				timeZone: userTimezone
			}));
			endOfDayCurrentDate.setHours(23, 59, 59, 999);

			// Convert to UTC for database query
			const startOfDayUTC = new Date(startOfDayCurrentDate.getTime() - (startOfDayCurrentDate.getTimezoneOffset() * 60000));
			const endOfDayUTC = new Date(endOfDayCurrentDate.getTime() - (endOfDayCurrentDate.getTimezoneOffset() * 60000));

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
						lte: endOfDayUTC,
					},
				},
			});

			return completedSessionIds.map((session) => session.sessionId);
		}),
});
