import { useEffect, useState, useMemo } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';
import SmallSpinner from './smallSpinner';
import Image from 'next/image';
import { type User } from 'next-auth';
import { Preference } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';
import { showConfetti } from '~/utils/confetti';

interface CurrentWorkoutDisplayProps {
	user: User;
}

const WorkoutSessionDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	user,
}) => {
	// Create a single Date object that can be reused across queries
	const currentDate = useMemo(() => new Date(), []);

	//#region Queries
	const {
		data: possibleSessionsToStart,
		isLoading: isPossibleSessionsLoading,
	} = api.session.getSessionsThatAreActiveOnDate.useQuery({
		userId: user.id,
		date: currentDate,
	});

	const {
		data: activeSessionData,
		isLoading: isActiveSessionLoading,
		refetch: refetchActiveSessionData,
	} = api.activeSesssion.getActiveSession.useQuery({
		userId: user.id,
	});

	const {
		data: listOfCompletedSessionIds,
		isLoading: isCompletedSessionsLoading,
		refetch: refetchCompletedSessions,
	} = api.completedSession.getListOfCompletedSessionIdsForActiveRoutine.useQuery(
		{
			userUTCDateTime: currentDate,
		},
	);

	const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
		api.routine.getActiveRoutine.useQuery({
			userId: user.id,
		});

	const {
		data: workoutsForActiveSession,
		isLoading: isWorkoutsLoading,
		refetch: refetchWorkouts,
	} = api.workout.getWorkoutsForActiveSession.useQuery(
		{
			userId: user.id,
			sessionId: activeSessionData?.session.id ?? '',
		},
		{
			// Only fetch if we have an active session
			enabled: !!activeSessionData?.session.id,
		},
	);
	//#endregion

	// Simplified loading state
	const isLoading =
		isPossibleSessionsLoading ||
		isActiveSessionLoading ||
		isCompletedSessionsLoading ||
		isActiveRoutineLoading ||
		(!!activeSessionData && isWorkoutsLoading); // Only consider workout loading when there's an active session

	//#region Mutations with simplified names
	const { mutateAsync: startSession } =
		api.activeSesssion.addActiveSession.useMutation();

	const { mutateAsync: completeSession } =
		api.completedSession.createCompletedSession.useMutation();
	//#endregion

	//#region UI Handlers
	const refetchAll = () =>
		Promise.all([
			refetchActiveSessionData(),
			refetchWorkouts(),
			refetchCompletedSessions(),
		]);

	// Add state to track checked workouts
	const [checkedWorkouts, setCheckedWorkouts] = useState<
		Record<string, boolean>
	>({});

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
	//#endregion

	//#region State
	const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);
	const [sessionHasStarted, setSessionHasStarted] = useState(false);
	//#endregion

	const userHasConfettiPreferenceEnabled = user.userPreferences?.some(
		(preference) =>
			preference.preference ===
				Preference.CONFETTI_ON_SESSION_COMPLETION &&
			preference.enabled === true,
	);

	useEffect(() => {
		if (workoutsForActiveSession) {
			if (workoutsForActiveSession.length > 0) {
				const workoutCompletionMap = localStorage.getItem(
					'workoutCompletionMap',
				);

				if (!workoutCompletionMap) {
					const initialMap = Object.fromEntries(
						workoutsForActiveSession.map(({ id }) => [id, false]),
					);
					localStorage.setItem(
						'workoutCompletionMap',
						JSON.stringify(initialMap),
					);
					setCheckedWorkouts(initialMap);
				} else {
					const savedMap = JSON.parse(workoutCompletionMap);
					setCheckedWorkouts(savedMap);
					setAllWorkoutsCompleted(
						Object.values(savedMap).every(Boolean),
					);
				}
			}
		}
	}, [workoutsForActiveSession]);

	if (isLoading) {
		return <SmallSpinner />;
	}

	if (!activeRoutine) {
		return (
			<div className="flex h-full items-center justify-center">
				<h1 className="m-12 text-lg font-medium text-gray-700">
					No active routine, please go to manage routines to create
					one and start it
				</h1>
			</div>
		);
	}

	return (
		<div className="flex h-full w-[95%] flex-col items-center">
			{possibleSessionsToStart && possibleSessionsToStart.length === 0 ? (
				<div className="flex flex-col items-center justify-center p-4 text-center">
					<Image
						src="/gifs/bunnyRunner.gif"
						alt="Animated running rabbit"
						width={200}
						height={200}
						className="mb-4"
					/>
					<p className="text-base text-gray-600">
						Your active routine,{' '}
						<span className="font-medium">
							{activeRoutine?.name}
						</span>
						, has no sessions for today!
					</p>
				</div>
			) : (
				<>
					{activeSessionData === null &&
					sessionHasStarted === false ? (
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
											void handleStartSessionClick(
												session.id,
											)
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
										{listOfCompletedSessionIds?.includes(
											session.id,
										)
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
								<CurrentSessionElapsedTimer
									startedAtDate={activeSessionData?.startedAt}
								/>
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
										isChecked={
											checkedWorkouts[workout.id] || false
										}
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
				</>
			)}
		</div>
	);
};

export default WorkoutSessionDisplay;
