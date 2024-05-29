import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

export const exerciseRouter = createTRPCRouter({
	getAllExercises: protectedProcedure.query(async () => {
		const exercises = await prisma.exercise.findMany();

		return exercises;
	}),
});
