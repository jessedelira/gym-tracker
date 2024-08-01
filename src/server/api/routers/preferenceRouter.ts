import { z } from 'zod';
import { prisma } from '~/server/db';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const preferenceRouter = createTRPCRouter({
	enablePreferenceById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			await prisma.userPreference.update({
				where: {
					id: input.id,
				},
				data: {
					enabled: true,
				},
			});
		}),

	// TODO: Disable preference by ID
	disablePreferenceById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			await prisma.userPreference.update({
				where: {
					id: input.id,
				},
				data: {
					enabled: false,
				},
			});
		}),
});
