import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/db';
import bcrypt from 'bcrypt';

const primsa = new PrismaClient();

export const accountDeletionRouter = createTRPCRouter({
	deleteAccount: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				username: z.string(),
				password: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: {
					id: input.userId,
					username: input.username,
				},
			});

			if (!user) {
				throw new Error('User not found');
			}

			const doesInputPwMatchEncryptedPw = bcrypt.compareSync(
				input.password as 'string | Buffer',
				user.password as 'string',
			);

			if (!doesInputPwMatchEncryptedPw) {
				throw new Error('Password incorrect');
			}

			const deletedWorkouts = await primsa.workout.deleteMany({
				where: {
					userId: input.userId,
				},
			});

			const deletedSessions = await primsa.session.deleteMany({
				where: {
					userId: input.userId,
				},
			});

			const deletedRoutines = await primsa.routine.deleteMany({
				where: {
					userId: input.userId,
				},
			});

			const deletedUser = await primsa.user.delete({
				where: {
					id: input.userId,
				},
			});

			console.log('Number of workouts deleted: ', deletedWorkouts.count);
			console.log('Number of sessions deleted: ', deletedSessions.count);
			console.log('Number of routines deleted: ', deletedRoutines.count);
			console.log('User Deleted: ', deletedUser);

			const allDeletedData = {
				deletedWorkouts,
				deletedSessions,
				deletedRoutines,
				deletedUser,
			};

			return allDeletedData;
		}),
});
