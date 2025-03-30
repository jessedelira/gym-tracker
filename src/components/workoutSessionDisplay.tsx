import { useEffect, useState, useMemo } from 'react';
import { api } from '~/utils/api';
import SmallSpinner from './smallSpinner';
import { type User } from 'next-auth';
import { Preference } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';
import { showConfetti } from '~/utils/confetti';
import { NoActiveRoutineView } from './workout/NoActiveRoutineView';
import { NoSessionsView } from './workout/NoSessionsView';
import { WelcomeNewUserView } from './workout/WelcomeNewUserView';

interface CurrentWorkoutDisplayProps {
	user: User;
}

type WorkoutCompletionMap = Record<string, boolean>;

const WorkoutSessionDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	user,
}) => {
	// Move ALL hooks to the top
	const currentDate = useMemo(() => new Date(), []);
	const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);
	const [sessionHasStarted, setSessionHasStarted] = useState(false);
	const [checkedWorkouts, setCheckedWorkouts] = useState<
		Record<string, boolean>
	>({});

	// All queries
	const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
		api.routine.getActiveRoutine.useQuery({
			userId: user.id,
		});

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
	} = api.workout.getWorkoutsForActiveSession.useQuery(
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
			if (workoutsForActiveSession.length > 0) {
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
					setCheckedWorkouts(initialMap);
				} else {
					try {
						// Safely parse and validate the stored data
						const parsedMap = JSON.parse(
							workoutCompletionMap,
						) as Record<string, unknown>;

						// Validate the parsed data
						const isValidMap = (
							map: Record<string, unknown>,
						): map is WorkoutCompletionMap => {
							return Object.values(map).every(
								(value) => typeof value === 'boolean',
							);
						};

						if (isValidMap(parsedMap)) {
							setCheckedWorkouts(parsedMap);
							setAllWorkoutsCompleted(
								Object.values(parsedMap).every(Boolean),
							);
						} else {
							// If invalid data, reset to initial state
							const initialMap: WorkoutCompletionMap =
								Object.fromEntries(
									workoutsForActiveSession.map(({ id }) => [
										id,
										false,
									]),
								);
							localStorage.setItem(
								'workoutCompletionMap',
								JSON.stringify(initialMap),
							);
							setCheckedWorkouts(initialMap);
						}
					} catch (error) {
						// Handle invalid JSON in localStorage
						console.error(
							'Invalid workout completion data in localStorage:',
							error,
						);
						const initialMap: WorkoutCompletionMap =
							Object.fromEntries(
								workoutsForActiveSession.map(({ id }) => [
									id,
									false,
								]),
							);
						localStorage.setItem(
							'workoutCompletionMap',
							JSON.stringify(initialMap),
						);
						setCheckedWorkouts(initialMap);
					}
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
			...checkedWorkouts,
			[workoutId]: isNowChecked,
		};

		setCheckedWorkouts(updatedWorkouts);
		localStorage.setItem(
			'workoutCompletionMap',
			JSON.stringify(updatedWorkouts),
		);
		setAllWorkoutsCompleted(Object.values(updatedWorkouts).every(Boolean));
	};

	const handleStartSessionClick = async (sessionId: string) => {
		await startSession(
			{ userId: user.id, sessionId },
			{
				onSuccess: () => {
					setSessionHasStarted(true);
					setAllWorkoutsCompleted(false);
				},
			},
		);
		localStorage.removeItem('workoutCompletionMap');
		await refetchActiveSessionData();
	};

	const handleCompleteSessionClick = async () => {
		if (!activeSessionData) return;

		try {
			// Update UI state immediately for better user experience
			setSessionHasStarted(false);
			setAllWorkoutsCompleted(false);
			localStorage.removeItem('workoutCompletionMap');

			// Show confetti without waiting
			if (userHasConfettiPreferenceEnabled) {
				void showConfetti();
			}

			// Complete session
			await completeSession({
				userId: user.id,
				sessionId: activeSessionData.session.id,
			});

			// Refetch data after completion
			void refetchAll();
		} catch (error) {
			console.error('Error completing session:', error);
			// Revert UI state if there's an error
			setSessionHasStarted(true);
		}
	};

	// Computed values
	const isLoading =
		(isActiveRoutineLoading && !activeRoutine) ||
		(isActiveSessionLoading && !!activeRoutine) ||
		(!!activeRoutine && !activeSessionData && isPossibleSessionsLoading) ||
		(!!activeRoutine && !activeSessionData && isCompletedSessionsLoading) ||
		(!!activeSessionData && isWorkoutsLoading);

	const isNewUser = !activeRoutine;
	const hasNoActiveRoutine =
		!isActiveRoutineLoading &&
		!activeRoutine &&
		!activeSessionData &&
		(!possibleSessionsToStart || possibleSessionsToStart.length === 0);

	const userHasConfettiPreferenceEnabled = user.userPreferences?.some(
		(preference) =>
			preference.preference ===
				Preference.CONFETTI_ON_SESSION_COMPLETION &&
			preference.enabled === true,
	);

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

	if (!activeRoutine) {
		return <NoActiveRoutineView />;
	}

	if (!possibleSessionsToStart || possibleSessionsToStart.length === 0) {
		return <NoSessionsView routineName={activeRoutine.name} />;
	}

	// Main render
	return (
		<div className="flex h-full w-[95%] flex-col items-center">
			{activeSessionData === null && sessionHasStarted === false ? (
				<div className="w-[90%] space-y-3 pt-4">
					{possibleSessionsToStart?.map((session) => (
						<div
							key={session.id}
							className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
						>
							<div className="mb-2">
								<h2 className="text-lg font-medium text-gray-900">
									{session.name}
								</h2>
								{session.description && (
									<p className="mt-1 text-sm text-gray-500">
										{session.description}
									</p>
								)}
							</div>
							<button
								onClick={() =>
									void handleStartSessionClick(session.id)
								}
								disabled={listOfCompletedSessionIds?.includes(
									session.id,
								)}
								className={`mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium ${
									listOfCompletedSessionIds?.includes(
										session.id,
									)
										? 'bg-gray-100 text-gray-400'
										: 'bg-blue-600 text-white hover:bg-blue-700'
								}`}
							>
								{listOfCompletedSessionIds?.includes(session.id)
									? 'Completed'
									: 'Start Session'}
							</button>
						</div>
					))}
				</div>
			) : (
				<div className="w-[90%] flex-1 flex-col pt-4">
					<div className="mb-4 w-full rounded-lg bg-gray-50 p-4">
						<h1 className="text-base font-medium text-gray-900">
							{activeSessionData?.session.name}
						</h1>
						{activeSessionData?.startedAt && (
							<CurrentSessionElapsedTimer
								startedAtDate={activeSessionData.startedAt}
							/>
						)}
					</div>

					<div className="flex-1 space-y-3 overflow-auto pb-24">
						{workoutsForActiveSession?.map((workout) => (
							<WorkoutCard
								key={workout.id}
								workoutId={workout.id}
								exerciseName={workout.exercise.name}
								onChangeHanlder={handleCheckboxChange}
								sets={workout.sets}
								weightInLbs={workout.weightLbs}
								reps={workout.reps}
								isChecked={checkedWorkouts[workout.id] || false}
							/>
						))}
					</div>

					<div
						className={`fixed inset-x-0 bottom-16 z-50 transform transition-all duration-300 ${
							allWorkoutsCompleted
								? 'translate-y-0 opacity-100'
								: 'pointer-events-none translate-y-full opacity-0'
						}`}
					>
						<div className="bg-white px-4 pb-4 pt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
			)}
		</div>
	);
};

export default WorkoutSessionDisplay;
