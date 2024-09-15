import { prisma } from '~/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const activeSessionRouter = createTRPCRouter({
	addActiveSession: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				sessionId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// 1. find session by id
			await prisma.activeSession.create({
				data: {
					sessionId: input.sessionId,
					userId: input.userId,
					startedAt: new Date(),
				},
			});
		}),

	getActiveSession: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const activeSession = await prisma.activeSession.findFirst({
				select: {
					startedAt: true,
					session: {
						select: {
							id: true,
							name: true,
						},
					},
				},
				where: {
					userId: input.userId,
				},
			});
			return activeSession;
		}),

	// TODO: implement get the activeSession data, including the workouts & exercises, with completed workout ids
	getActiveSessionComplete: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				clientCurrentDate: z.date(),
			}),
		)
		.query(async ({ input }) => {
			const activeSessionCompleteData =
				await prisma.activeSession.findFirst({
					select: {
						startedAt: true,
						session: {
							select: {
								id: true,
								name: true,
								workouts: {
									select: {
										id: true,
										reps: true,
										sets: true,
										weightLbs: true,
										isCompletedOnActiveSession: true,
										exercise: true,
									},
								},
							},
						},
					},
					where: {
						userId: input.userId,
						session: {
							workouts: {
								some: {
									userId: input.userId,
								},
							},
							activeSession: {
								some: {
									userId: input.userId,
								},
							},
						},
					},
				});

			// const startOfDayCurrentDate = new Date(input.clientCurrentDate);
			// startOfDayCurrentDate.setHours(0, 0, 0, 0);
			// const endOfDayCurrentDate = new Date(input.clientCurrentDate);
			// endOfDayCurrentDate.setHours(23, 59, 59, 999);

			// const sessionsOnActiveRoutine = await prisma.session.findMany({
			// 	where: {
			// 		userId: input.userId,
			// 		routine: {
			// 			isActive: true,
			// 		},
			// 	},
			// });

			// const completedSessionIds = await prisma.completedSession.findMany({
			// 	select: {
			// 		sessionId: true,
			// 	},
			// 	where: {
			// 		sessionId: {
			// 			in: sessionsOnActiveRoutine.map(
			// 				(session) => session.id,
			// 			),
			// 		},
			// 		AND: [
			// 			{ completedAt: { gte: startOfDayCurrentDate } },
			// 			{ completedAt: { lte: endOfDayCurrentDate } },
			// 		],
			// 	},
			// });

			// if (completedSessionIds.length === 0) {
			// 	return null;
			// }
			// // make the array just the ids and no object
			// const completedSessionIdsArray = completedSessionIds.map(
			// 	(session) => session.sessionId,
			// );

			// if (completedSessionIdsArray.length === 0) {
			// 	return null;
			// }

			// const returnDto = {
			// 	activeSessionCompleteData,
			// } as {
			// 	activeSessionCompleteData: {
			// 		session: {
			// 			name: string;
			// 			id: string;
			// 			workouts: {
			// 				exercise: {
			// 					id: string;
			// 					name: string;
			// 					description: string | null;
			// 					isAerobic: boolean;
			// 				};
			// 				id: string;
			// 				reps: number;
			// 				sets: number;
			// 				weightLbs: number;
			// 				isCompletedOnActiveSession: boolean;
			// 			}[];
			// 		};
			// 		completedSessionIds: string[];
			// 		startedAt: Date;
			// 	} | null;
			// };

			// if (returnDto.activeSessionCompleteData) {
			// 	returnDto.activeSessionCompleteData.completedSessionIds =
			// 		completedSessionIdsArray;
			// }

			return activeSessionCompleteData;
		}),
});
