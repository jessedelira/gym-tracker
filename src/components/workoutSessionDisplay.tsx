import { useEffect, useState, useMemo } from 'react';
import { api } from '~/utils/api';
import SmallSpinner from './smallSpinner';
import { type User } from 'next-auth';
import { type ExerciseType, Preference } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';
import { showConfetti } from '~/utils/confetti';
import { NoActiveRoutineView } from './workout/NoActiveRoutineView';
import { NoSessionsView } from './workout/NoSessionsView';
import { WelcomeNewUserView } from './workout/WelcomeNewUserView';
import WorkoutSessionCard from './workoutSessionCard';
import { type Session } from '@prisma/client';
import { useEnableConfetti } from '~/hooks/useEnableConfetti';

interface CurrentWorkoutDisplayProps {
	user: User;
}

type WorkoutCompletionMap = Record<string, boolean>;

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
	const [isEveryWorkoutComplete, setIsEveryWorkoutComplete] = useState(false);
	const [workoutProgressMap, setWorkoutProgressMap] = useState<
		Record<string, boolean>
	>({});
	const userHasConfettiPreferenceEnabled = useEnableConfetti(user);

	// All queries
	const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
		api.routine.getActiveRoutine.useQuery({
			userId: user.id,
		});

	const { data: routineCount, isLoading: isRoutineCountLoading } =
		api.routine.getRoutineCountByUserId.useQuery();

	const {
		data: activeSessionData,
		isLoading: isActiveSessionLoading,
		refetch: refetchActiveSessionData,
	} = api.activeSesssion.getActiveSession.useQuery(
		{ userId: user.id },
		{ enabled: !!activeRoutine },
	);

	const {
		data: possibleSessionsToStart,
		isLoading: isPossibleSessionsLoading,
	} = api.session.getSessionsThatAreActiveOnDate.useQuery(
		{ userId: user.id, date: currentDate },
		{ enabled: !!activeRoutine && !activeSessionData },
	);

	const {
		data: listOfCompletedSessionIds,
		isLoading: isCompletedSessionsLoading,
		refetch: refetchCompletedSessions,
	} = api.completedSession.getListOfCompletedSessionIdsForActiveRoutine.useQuery(
		{ userUTCDateTime: currentDate },
		{ enabled: !!activeRoutine && !activeSessionData },
	);

	const {
		data: workoutsForActiveSession,
		isLoading: isWorkoutsLoading,
		refetch: refetchWorkouts,
	} = api.workout.getWorkoutsForActiveSession.useQuery<WorkoutWithExercise[]>(
		{
			userId: user.id,
			sessionId: activeSessionData?.session.id ?? '',
		},
		{ enabled: !!activeSessionData?.session.id },
	);

	// All mutations
	const { mutateAsync: startSession } =
		api.activeSesssion.addActiveSession.useMutation();

	const { mutateAsync: completeSession } =
		api.completedSession.createCompletedSession.useMutation();

	// Effects
	useEffect(() => {
		if (workoutsForActiveSession) {
			const workoutCompletionMap = localStorage.getItem(
				'workoutCompletionMap',
			);

			if (!workoutCompletionMap) {
				const initialMap: WorkoutCompletionMap = Object.fromEntries(
					workoutsForActiveSession.map(({ id }) => [id, false]),
				);
				localStorage.setItem(
					'workoutCompletionMap',
					JSON.stringify(initialMap),
				);
				setWorkoutProgressMap(initialMap);
			} else {
				// Safely parse and validate the stored data
				const parsedMap = JSON.parse(workoutCompletionMap) as Record<
					string,
					unknown
				>;

				if (isValidMap(parsedMap)) {
					setWorkoutProgressMap(parsedMap);
					setIsEveryWorkoutComplete(
						Object.values(parsedMap).every(Boolean),
					);
				} else {
					// If invalid data, reset to initial state
					const initialMap: WorkoutCompletionMap = Object.fromEntries(
						workoutsForActiveSession.map(({ id }) => [id, false]),
					);
					localStorage.setItem(
						'workoutCompletionMap',
						JSON.stringify(initialMap),
					);
					setWorkoutProgressMap(initialMap);
				}
			}
		}
	}, [workoutsForActiveSession]);

	// Handlers
	const refetchAll = () =>
		Promise.all([
			refetchActiveSessionData(),
			refetchWorkouts(),
			refetchCompletedSessions(),
		]);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;

		const updatedWorkouts = {
			...workoutProgressMap,
			[workoutId]: isNowChecked,
		};

		setWorkoutProgressMap(updatedWorkouts);
		localStorage.setItem(
			'workoutCompletionMap',
			JSON.stringify(updatedWorkouts),
		);
		setIsEveryWorkoutComplete(
			Object.values(updatedWorkouts).every(Boolean),
		);
	};

	// Validate the parsed data
	const isValidMap = (
		map: Record<string, unknown>,
	): map is WorkoutCompletionMap => {
		return Object.values(map).every((value) => typeof value === 'boolean');
	};

	const handleStartSessionClick = async (sessionId: string) => {
		await startSession(
			{ userId: user.id, sessionId },
			{
				onSuccess: () => {
					setIsEveryWorkoutComplete(false);
				},
			},
		);
		localStorage.removeItem('workoutCompletionMap');
		await refetchActiveSessionData();
	};

	const handleCompleteSessionClick = async () => {
		if (!activeSessionData) return;
		setIsEveryWorkoutComplete(false);
		localStorage.removeItem('workoutCompletionMap');

		if (userHasConfettiPreferenceEnabled) {
			void showConfetti();
		}

		await completeSession({
			userId: user.id,
			sessionId: activeSessionData.session.id,
		});

		void refetchAll();
	};

	// Computed values
	const isLoading =
		(isActiveRoutineLoading && !activeRoutine) ||
		(isActiveSessionLoading && !!activeRoutine) ||
		(!!activeRoutine && !activeSessionData && isPossibleSessionsLoading) ||
		(!!activeRoutine && !activeSessionData && isCompletedSessionsLoading) ||
		(!!activeSessionData && isWorkoutsLoading);

	const isNewUser = !activeRoutine && routineCount === 0;
	const hasNoActiveRoutine = !isActiveRoutineLoading && !activeRoutine;
	const hasNoSessions =
		!!activeRoutine &&
		!activeSessionData &&
		!isPossibleSessionsLoading &&
		(!possibleSessionsToStart || possibleSessionsToStart.length === 0);

	// Render logic
	if (isLoading) {
		return <SmallSpinner />;
	}

	if (isNewUser) {
		return <WelcomeNewUserView />;
	}

	if (hasNoActiveRoutine) {
		return <NoActiveRoutineView />;
	}

	if (activeSessionData && workoutsForActiveSession) {
		return (
			<div className="flex h-full w-[95%] flex-col items-center">
				<div className="w-[90%] flex-1 flex-col pt-4">
					<div className="mb-4 w-full rounded-lg bg-gray-50 p-4">
						<h1 className="text-base font-medium text-gray-900">
							{activeSessionData.session.name}
						</h1>
						{activeSessionData.startedAt && (
							<CurrentSessionElapsedTimer
								startedAtDate={activeSessionData.startedAt}
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
		return <NoSessionsView routineName={activeRoutine?.name ?? ''} />;
	}

	// Show available sessions to start
	return (
		<div className="flex h-full w-[95%] flex-col items-center">
			<div className="w-[90%] space-y-3 pt-4">
				{possibleSessionsToStart?.map((session) => (
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
