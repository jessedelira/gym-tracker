import { createTRPCRouter } from '~/server/api/trpc';
import { userRouter } from './routers/userRouter';
import { routineRouter } from './routers/routineRouter';
import { exerciseRouter } from './routers/exerciseRouter';
import { sessionRouter } from './routers/sessionRouter';
import { workoutRouter } from './routers/workoutRouter';
import { accountDeletionRouter } from './routers/accountDeletionRouter';
import { activeSessionRouter } from './routers/activeSessionRouter';
import { completedSessionRouter } from './routers/completedSessionRouter';
import { preferenceRouter } from './routers/preferenceRouter';
import { timezoneMapRouter } from './routers/timezoneMapRouter';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	routine: routineRouter,
	exercise: exerciseRouter,
	session: sessionRouter,
	workout: workoutRouter,
	accountDeletion: accountDeletionRouter,
	activeSesssion: activeSessionRouter,
	activeWorkout: workoutRouter,
	completedSession: completedSessionRouter,
	preference: preferenceRouter,
	timezoneMap: timezoneMapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
