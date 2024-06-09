import { prisma } from '~/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const workoutRouter = createTRPCRouter({
	createWorkout: protectedProcedure
		.input(
			z.object({
				exerciseId: z.string(),
				weight: z.number(),
				reps: z.number(),
				sets: z.number(),
				sessionId: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(({ input }) => {
			const createdWorkout = prisma.workout.create({
				data: {
					exerciseId: input.exerciseId,
					weightLbs: input.weight,
					reps: input.reps,
					sets: input.sets,
					sessionId: input.sessionId,
					userId: input.userId,
				},
			});
			return createdWorkout;
		}),

	getAllWorkouts: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const workouts = await prisma.workout.findMany({
				where: {
					userId: input.userId,
				},
			});
			return workouts;
		}),

	createManyWorkouts: protectedProcedure
		.input(
			z.array(
				z.object({
					exerciseId: z.string(),
					weightLbs: z.number(),
					reps: z.number(),
					sets: z.number(),
					sessionId: z.string(),
					userId: z.string(),
				}),
			),
		)
		.mutation(async ({ input }) => {
			const createdWorkouts = await prisma.workout.createMany({
				data: input,
			});
			return createdWorkouts;
		}),
});
