import { createTRPCRouter } from '~/server/api/trpc';
import { userRouter } from './routers/userRouter';
import { routineRouter } from './routers/routineRouter';
import { exerciseRouter } from './routers/exerciseRouter';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	routine: routineRouter,
	exercise: exerciseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
