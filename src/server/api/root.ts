import { createTRPCRouter } from '~/server/api/trpc';
import { exampleRouter } from '~/server/api/routers/exampleRouter';
import { userRouter } from './routers/userRouter';
import { routineRouter } from './routers/routineRouter';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	user: userRouter,
	routine: routineRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
