import { prisma } from '~/server/db';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { ExerciseType } from '@prisma/client';

export type WorkoutWithExercise = ({
	exercise: {
		name: string;
		id: string;
		type: ExerciseType;
		description: string | null;
	};
} & {
	id: string;
	userId: string;
	sessionId: string;
	exerciseId: string;
	weightLbs: number | null;
	reps: number | null;
	sets: number | null;
	durationSeconds: number | null;
})[];

export const workoutRouter = createTRPCRouter({
	createWorkout: protectedProcedure
		.input(
			z.object({
				exerciseId: z.string(),
				weight: z.number().optional(),
				reps: z.number().optional(),
				sets: z.number().optional(),
				durationSeconds: z.number().optional(),
				sessionId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const exercise = await ctx.prisma.exercise.findUnique({
				where: { id: input.exerciseId },
			});

			if (!exercise) {
				throw new Error('Exercise not found');
			}

			const workoutData = {
				exerciseId: input.exerciseId,
				sessionId: input.sessionId,
				userId: ctx.session?.user.id,
			};

			if (exercise.type === ExerciseType.WEIGHTED) {
				Object.assign(workoutData, {
					weightLbs: input.weight,
					reps: input.reps,
					sets: input.sets,
				});
			} else {
				Object.assign(workoutData, {
					durationSeconds: input.durationSeconds,
				});
			}

			const createdWorkout = await ctx.prisma.workout.create({
				data: workoutData,
			});
			return createdWorkout;
		}),

	getAllWorkouts: protectedProcedure.query(async ({ ctx }) => {
		const workouts = await prisma.workout.findMany({
			where: {
				userId: ctx.session?.user.id,
			},
			include: {
				exercise: true,
			},
		});
		return workouts;
	}),

	createManyWorkouts: protectedProcedure
		.input(
			z.array(
				z.object({
					exerciseId: z.string(),
					weightLbs: z.number().optional(),
					reps: z.number().optional(),
					sets: z.number().optional(),
					durationSeconds: z.number().optional(),
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
		.input(
			z.object({
				userId: z.string(),
				sessionId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const workoutsOnActiveSession = await prisma.workout.findMany({
				where: {
					sessionId: input.sessionId,
				},
				include: {
					exercise: true,
				},
			});

			if (!workoutsOnActiveSession) {
				return null;
			}

			return workoutsOnActiveSession as WorkoutWithExercise;
		}),
});
