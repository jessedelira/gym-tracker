import { useMemo } from 'react';
import { api } from '~/utils/api';
import SmallSpinner from './smallSpinner';
import { type User } from 'next-auth';
import { isConfettiEnabled, showConfetti } from '~/utils/confetti';
import { NoActiveRoutineView } from './workout/NoActiveRoutineView';
import { NoSessionsView } from './workout/NoSessionsView';
import { WelcomeNewUserView } from './workout/WelcomeNewUserView';
import WorkoutSessionCard from './workoutSessionCard';
import { type Session } from '@prisma/client';
import { useWorkoutProgress } from '~/hooks/useWorkoutProgress';
import ActiveSessionWorkoutList from './workoutList';
import { type WorkoutWithExercise } from '~/server/api/routers/workoutRouter';

const WorkoutSessionDisplay: React.FC<{ user: User }> = ({ user }) => {
	const currentDate = useMemo(() => new Date(), []);
	const userHasConfettiPreferenceEnabled = isConfettiEnabled(user);

	// All queries
	const { data: routineCount, isLoading: isRoutineCountLoading } =
		api.routine.getRoutineCountByUserId.useQuery();

	const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
		api.routine.getActiveRoutine.useQuery(undefined, {
			enabled: isRoutineCountLoading === false,
		});

	const {
		data: activeSession,
		isLoading: isActiveSessionLoading,
		refetch: refetchActiveSession,
	} = api.activeSesssion.getActiveSession.useQuery(
		{ userId: user.id },
		{ enabled: !!activeRoutine },
	);

	const {
		data: listOfSessionsOnCurrentDate,
		isLoading: isListOfSessionsOnCurrentDateLoading,
	} = api.session.getSessionsThatAreActiveOnDate.useQuery(
		{ userId: user.id, date: currentDate },
		{
			enabled:
				!!activeRoutine &&
				!activeSession &&
				isActiveSessionLoading === false,
		},
	);

	const {
		data: listOfCompletedSessionIds,
		isLoading: isCompletedSessionsLoading,
		refetch: refetchCompletedSessions,
	} = api.completedSession.getListOfCompletedSessionIdsForActiveRoutine.useQuery(
		{ userUTCDateTime: currentDate },
		{
			enabled:
				!!activeRoutine &&
				!activeSession &&
				isActiveSessionLoading === false,
		},
	);

	const {
		data: workoutsForActiveSession,
		isLoading: isWorkoutsLoading,
		refetch: refetchWorkouts,
	} = api.workout.getWorkoutsForActiveSession.useQuery<WorkoutWithExercise>(
		{
			userId: user.id,
			sessionId: activeSession?.session.id ?? '',
		},
		{ enabled: !!activeSession?.session.id },
	);

	// Use custom hook for workout progress
	const {
		workoutProgressMap,
		isEveryWorkoutComplete,
		updateWorkoutProgress,
		resetWorkoutProgress,
	} = useWorkoutProgress(workoutsForActiveSession || []);

	// All mutations
	const { mutateAsync: startSession } =
		api.activeSesssion.addActiveSession.useMutation();

	const { mutateAsync: completeSession } =
		api.completedSession.createCompletedSession.useMutation();

	// Handlers
	const refetchAll = () =>
		Promise.all([
			refetchActiveSession(),
			refetchWorkouts(),
			refetchCompletedSessions(),
		]);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;
		updateWorkoutProgress(workoutId, isNowChecked);
	};

	const handleStartSessionClick = async (sessionId: string) => {
		await startSession({ userId: user.id, sessionId });
		await refetchActiveSession();
	};

	const handleCompleteSessionClick = async () => {
		if (!activeSession) return;
		resetWorkoutProgress();

		if (userHasConfettiPreferenceEnabled) {
			void showConfetti();
		}

		await completeSession({
			userId: user.id,
			sessionId: activeSession.session.id,
		});

		void refetchAll();
	};

	const isLoadingInitialData = isRoutineCountLoading;
	const isLoadingActiveSession = isActiveSessionLoading && !!activeRoutine;
	const isLoadingPossibleSessions =
		!!activeRoutine &&
		!activeSession &&
		isListOfSessionsOnCurrentDateLoading;
	const isLoadingCompletedSessions =
		!!activeRoutine && !activeSession && isCompletedSessionsLoading;
	const isLoadingWorkouts = !!activeSession && isWorkoutsLoading;

	const isLoading =
		isLoadingInitialData ||
		isLoadingActiveSession ||
		isLoadingPossibleSessions ||
		isLoadingCompletedSessions ||
		isLoadingWorkouts;

	const isUserWithoutRoutines = routineCount === 0;
	const hasNoActiveRoutine =
		!isActiveRoutineLoading && !activeRoutine && routineCount !== 0;
	const hasNoSessions =
		!!activeRoutine &&
		!activeSession &&
		!isListOfSessionsOnCurrentDateLoading &&
		(!listOfSessionsOnCurrentDate ||
			listOfSessionsOnCurrentDate.length === 0);

	// Render logic
	if (isLoading) {
		return <SmallSpinner />;
	}

	if (isUserWithoutRoutines) {
		return <WelcomeNewUserView />;
	}

	if (hasNoActiveRoutine) {
		return <NoActiveRoutineView />;
	}

	if (activeSession && workoutsForActiveSession && workoutProgressMap) {
		return (
			<ActiveSessionWorkoutList
				activeSession={activeSession}
				workoutsForActiveSession={workoutsForActiveSession}
				handleCheckboxChange={handleCheckboxChange}
				handleCompleteSessionClick={handleCompleteSessionClick}
				isEveryWorkoutComplete={isEveryWorkoutComplete}
				workoutProgressMap={workoutProgressMap}
			></ActiveSessionWorkoutList>
		);
	}

	if (hasNoSessions) {
		return <NoSessionsView routineName={activeRoutine.name} />;
	}

	return (
		<div className="flex h-full w-[95%] flex-col items-center">
			<div className="w-[90%] space-y-3 pt-4">
				{listOfSessionsOnCurrentDate?.map((session) => (
					<WorkoutSessionCard
						key={session.id}
						session={session as Session}
						listOfCompletedSessionIds={listOfCompletedSessionIds}
						onStartSession={() =>
							void handleStartSessionClick(session.id)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default WorkoutSessionDisplay;
