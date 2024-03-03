import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

const primsa = new PrismaClient();

export const accountDeletionRouter = createTRPCRouter({
	deleteAccount: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			// Delete workouts of the user
			const deletedWorkouts = await primsa.workout.deleteMany({
				where: {
					userId: input.userId,
				},
			});

			console.log('Number of workouts deleted: ', deletedWorkouts.count);

			//

			const deletedAccount = await primsa.user.delete({
				where: {
					id: input.userId,
				},
			});
			return deletedAccount;
		}),
});
