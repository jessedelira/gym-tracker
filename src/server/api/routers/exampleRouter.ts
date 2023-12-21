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

	// If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies the session is valid and guarantees ctx.session.user is not null.
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});
