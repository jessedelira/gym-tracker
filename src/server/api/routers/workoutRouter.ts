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

	getCompiledWorkoutsOfTheDay: protectedProcedure
		.input(z.object({ userId: z.string(), clientCurrentDate: z.date() }))
		.query(async ({ input }) => {
			/**
			 * Steps to get the compiled workouts of the day
			 * 1. Using the userId, find the active routine
			 * 2. Using the active routine, find the sessions on that routine
			 * 3. Given the date value form the client , find the session that matches the day of the week given
			 * 4. If more than one session create a larger workout list using both of those
			 */
			const dayMap = [
				'sunday',
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday',
			];

			const activeRoutine = await prisma.routine.findFirst({
				where: {
					userId: input.userId,
					isActive: true,
				},
			});
			console.log('active routine found:', activeRoutine);

			if (!activeRoutine) {
				return null;
			}

			const sessionsOnActiveRoutine = await prisma.session.findMany({
				where: {
					routineId: activeRoutine.id,
					days: {
						some: {
							day: dayMap[input.clientCurrentDate.getDay()],
						},
					},
				},
				include: {
					days: true,
					workouts: true,
				},
			});
			console.log(
				'sessions on active routine found:',
				sessionsOnActiveRoutine,
			);

			if (sessionsOnActiveRoutine.length === 0) {
				return null;
			}

			const workoutList = sessionsOnActiveRoutine.map((session) => {
				return session.workouts;
			});

			return workoutList.flat();
		}),
});
