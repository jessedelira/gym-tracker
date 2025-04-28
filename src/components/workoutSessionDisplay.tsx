import { useMemo } from 'react';
import { api } from '~/utils/api';
import SmallSpinner from './smallSpinner';
import { type User } from 'next-auth';
import { type ExerciseType } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';
import { showConfetti } from '~/utils/confetti';
import { NoActiveRoutineView } from './workout/NoActiveRoutineView';
import { NoSessionsView } from './workout/NoSessionsView';
import { WelcomeNewUserView } from './workout/WelcomeNewUserView';
import WorkoutSessionCard from './workoutSessionCard';
import { type Session } from '@prisma/client';
import { useEnableConfetti } from '~/hooks/useEnableConfetti';
import { useWorkoutProgress } from '~/hooks/useWorkoutProgress';

interface CurrentWorkoutDisplayProps {
	user: User;
}

type WorkoutWithExercise = {
	id: string;
	userId: string;
	sessionId: string;
	exerciseId: string;
	sets: number | null;
	reps: number | null;
	weightLbs: number | null;
	durationSeconds: number | null;
	exercise: {
		id: string;
		name: string;
		type: ExerciseType;
		description: string | null;
	};
};

const WorkoutSessionDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	user,
}) => {
	// Move ALL hooks to the top
	const currentDate = useMemo(() => new Date(), []);
	const userHasConfettiPreferenceEnabled = useEnableConfetti(user);

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
	} = api.workout.getWorkoutsForActiveSession.useQuery<WorkoutWithExercise[]>(
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
	} = useWorkoutProgress(workoutsForActiveSession);

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
		await startSession(
			{ userId: user.id, sessionId },
			{
				onSuccess: () => {
					resetWorkoutProgress();
				},
			},
		);
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

	if (activeSession && workoutsForActiveSession) {
		return (
			<div className="flex h-full w-[95%] flex-col items-center">
				<div className="w-[90%] flex-1 flex-col pt-4">
					<div className="mb-4 w-full rounded-lg bg-gray-50 p-4">
						<h1 className="text-base font-medium text-gray-900">
							{activeSession.session.name}
						</h1>
						{activeSession.startedAt && (
							<CurrentSessionElapsedTimer
								startedAtDate={activeSession.startedAt}
							/>
						)}
					</div>

					<div className="flex-1 space-y-3 overflow-auto pb-24">
						{workoutsForActiveSession.map((workout) => (
							<WorkoutCard
								key={workout.id}
								workoutId={workout.id}
								exerciseName={workout.exercise.name}
								onChangeHandler={handleCheckboxChange}
								sets={workout.sets}
								weightInLbs={workout.weightLbs}
								reps={workout.reps}
								durationSeconds={workout.durationSeconds}
								exerciseType={workout.exercise.type}
								isChecked={
									workoutProgressMap[workout.id] || false
								}
							/>
						))}
					</div>

					<div
						className={`fixed inset-x-0 bottom-0 z-20 transform transition-all duration-300 ${
							isEveryWorkoutComplete
								? 'translate-y-0 opacity-100'
								: 'pointer-events-none translate-y-full opacity-0'
						}`}
					>
						<div className="z-20 mb-20 p-4 ">
							<div className="mx-auto w-[90%] max-w-md">
								<button
									onClick={() =>
										void handleCompleteSessionClick()
									}
									className="w-full rounded-xl bg-green-600 px-4 py-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
								>
									Complete Workout Session
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (hasNoSessions) {
		return <NoSessionsView routineName={activeRoutine.name} />;
	}

	// Show available sessions to start
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
