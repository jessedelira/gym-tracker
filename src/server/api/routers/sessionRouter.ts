import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const primsa = new PrismaClient();

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
			// Create a new session
			const createdSession = await primsa.session.create({
				data: {
					name: input.name,
					description: input.description,
					userId: input.userId,
				},
			});

			await Promise.all(
				input.days.map(async (day) => {
					await primsa.sessionDaysActive.create({
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
			const sessions = await primsa.session.findMany({
				where: {
					userId: input.userId,
				},
			});
			return sessions;
		}),
});
