import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

export const exerciseRouter = createTRPCRouter({
	/**
	 * Return a list of all exercises that are in the database.
	 * @returns {Promise<Exercise[]>}
	 */
	getAllExercises: protectedProcedure.query(async () => {
		const exercises = await prisma.exercise.findMany();

		return exercises;
	}),
});
