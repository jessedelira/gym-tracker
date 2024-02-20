import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const primsa = new PrismaClient();

export const workoutRouter = createTRPCRouter({
	createWorkout: protectedProcedure
		.input(
			z.object({
				exerciseId: z.string(),
				weight: z.number(),
				reps: z.number(),
				sets: z.number(),
			}),
		)
		.mutation(({ input }) => {
			const createdWorkout = primsa.workout.create({
				data: {
					exerciseId: input.exerciseId,
					weight: input.weight,
					reps: input.reps,
					sets: input.sets,
					sessionId: 'your-session-id', // Add the sessionId property here
				},
			});
			return createdWorkout;
		}),
});
