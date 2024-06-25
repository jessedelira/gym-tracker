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

	getWorkoutsForActiveSession: protectedProcedure
		.input(z.object({ userId: z.string(), clientCurrentDate: z.date() }))
		.query(async ({ input }) => {
			const activeRoutine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});

			if (!activeRoutine) {
				return null;
			}

			const sessionOnActiveRoutine = await prisma.session.findFirst({
				where: {
					routineId: activeRoutine.id,
				},
				include: {
					workouts: true,
				},
			});

			if (!sessionOnActiveRoutine) {
				return null;
			}

			return sessionOnActiveRoutine.workouts;
		}),

	setWorkoutAsCompleted: protectedProcedure
		.input(z.object({ workoutId: z.string() }))
		.mutation(async ({ input }) => {
			await prisma.workout.update({
				where: {
					id: input.workoutId,
				},
				data: {
					isCompletedOnActiveSession: true,
				},
			});
		}),

	setWorkoutAsNotCompleted: protectedProcedure
		.input(z.object({ workoutId: z.string() }))
		.mutation(async ({ input }) => {
			await prisma.workout.update({
				where: {
					id: input.workoutId,
				},
				data: {
					isCompletedOnActiveSession: false,
				},
			});
		}),
});
