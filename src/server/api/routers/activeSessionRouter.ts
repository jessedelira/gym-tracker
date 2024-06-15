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
			const session = await prisma.session.findUnique({
				where: {
					id: input.sessionId,
				},
			});
			if (!session) {
				throw new Error('Session not found');
			}

			const createdActiveSession = await prisma.activeSession.create({
				data: {
					sessionId: input.sessionId,
					userId: input.userId,
					startedAt: new Date(),
				},
			});

			return createdActiveSession;
		}),

	getActiveSessions: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const activeSessions = await prisma.activeSession.findMany({
				where: {
					userId: input.userId,
				},
			});
			return activeSessions;
		}),
});
