import { z } from 'zod';

import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from '~/server/api/trpc';

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany();
	}),

	// If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies the session is valid and guarantees ctx.session.user is not null.
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),

	// create a procedure that takes in an object that has a 2d array of numbers, and returns the sum of all the numbers in the array
	sum2dArray: publicProcedure
		.input(z.object({ array: z.array(z.array(z.number())) }))
		.query(({ input }) => {
			let sum = 0;
			for (const row of input.array) {
				for (const num of row) {
					sum += num;
				}
			}
			return sum;
		}),

	superSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this super secret message!';
	}),
});
