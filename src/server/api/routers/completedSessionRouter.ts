import { prisma } from '~/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { format, toZonedTime, getTimezoneOffset } from 'date-fns-tz';

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
		.input(z.object({ userUTCDateTime: z.date() }))
		.query(async ({ input, ctx }) => {
			const userTimezone =
				ctx.session.user.userSetting?.timezone.iana ?? 'UTC';

			const userLocalDate = toZonedTime(
				input.userUTCDateTime,
				userTimezone,
			);

			const startOfDayLocal = new Date(userLocalDate);
			startOfDayLocal.setHours(0, 0, 0, 0);

			const endOfDayLocal = new Date(userLocalDate);
			endOfDayLocal.setHours(23, 59, 59, 999);

			const tzOffset = getTimezoneOffset(
				userTimezone,
				input.userUTCDateTime,
			);

			const startOfDayUTC = new Date(
				startOfDayLocal.getTime() - tzOffset,
			);
			const endOfDayUTC = new Date(endOfDayLocal.getTime() - tzOffset);

			const completedSessionIds = await prisma.completedSession.findMany({
				select: {
					sessionId: true,
				},
				where: {
					userId: ctx.session.user.id,
					session: {
						routine: {
							isActive: true,
						},
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
