import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const exerciseRouter = createTRPCRouter({
	getAllExercises: protectedProcedure.query(async () => {
		const exercises = await prisma.exercise.findMany();

		return exercises;
	}),
});
