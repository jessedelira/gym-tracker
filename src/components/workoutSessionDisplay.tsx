import { useEffect, useState } from 'react';
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
	currentDate: Date;
}

const WorkoutSessionDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	user,
	currentDate,
}) => {
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
			currentDate,
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
			clientCurrentDate: currentDate,
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

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;

		const workoutCompletionMap = JSON.parse(
			localStorage.getItem('workoutCompletionMap') || '[]',
		) as [string, boolean][];

		const updatedWorkoutCompletionMap = workoutCompletionMap.map(
			([id, isCompleted]) =>
				id === workoutId ? [id, isNowChecked] : [id, isCompleted],
		);

		localStorage.setItem(
			'workoutCompletionMap',
			JSON.stringify(updatedWorkoutCompletionMap),
		);

		setAllWorkoutsCompleted(
			updatedWorkoutCompletionMap.every(([, isCompleted]) => isCompleted),
		);
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
					const completionMap = workoutsForActiveSession?.map(
						({ id }) => [id, false],
					);

					localStorage.setItem(
						'workoutCompletionMap',
						JSON.stringify(completionMap),
					);
				}
			}

			const workoutCompletionMap = JSON.parse(
				localStorage.getItem('workoutCompletionMap') || '[]',
			) as [string, boolean][];

			const updateCheckbox = (workoutId: string) => {
				const checkbox = document.getElementById(workoutId);
				if (checkbox) {
					checkbox.setAttribute('checked', 'true');
				}
			};

			const checkAllWorkoutsCompleted = () => {
				return workoutCompletionMap.every(
					([, isCompleted]) => isCompleted === true,
				);
			};

			workoutsForActiveSession.forEach((workout) => {
				const workoutCompletionObj = workoutCompletionMap.find(
					([id]) => id === workout.id,
				);

				if (workoutCompletionObj?.[1]) {
					updateCheckbox(workout.id);
				}

				setAllWorkoutsCompleted(checkAllWorkoutsCompleted());
			});
		}
	}, [activeSessionData, workoutsForActiveSession]);

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
		<>
			{possibleSessionsToStart && possibleSessionsToStart.length === 0 ? (
				<div className="flex h-full items-center justify-center">
					<h1 className="m-12 pb-10 text-lg font-medium text-gray-700">
						<Image
							src="/gifs/bunnyRunner.gif"
							alt="Animated running rabbit"
							width={300}
							height={300}
						/>
						Your active routine, {activeRoutine.name}, has no
						sessions for today!
					</h1>
				</div>
			) : (
				<>
					{activeSessionData === null &&
					sessionHasStarted === false ? (
						<div className="hide-scrollbar overflow-auto">
							{possibleSessionsToStart &&
								possibleSessionsToStart.map((session) => (
									<HomePageSessionCard
										key={session.id}
										sessionName={session.name}
										sessionDescription={
											session.description ?? ''
										}
										handleStartButtonClick={() =>
											handleStartSessionClick(session.id)
										}
										isCompleted={listOfCompletedSessionIds?.includes(
											session.id,
										)}
									></HomePageSessionCard>
								))}
						</div>
					) : (
						<>
							{activeSessionData && workoutsForActiveSession && (
								<>
									<h1 className="font-bold">
										Current Workout Session:{' '}
										{activeSessionData.session.name}
									</h1>
									<CurrentSessionElapsedTimer
										startedAtDate={
											activeSessionData.startedAt
										}
									/>

									<div className="hide-scrollbar overflow-auto rounded-md">
										{workoutsForActiveSession.map(
											(workout) => (
												<WorkoutCard
													key={workout.id}
													workoutId={workout.id}
													exerciseName={
														workout.exercise.name
													}
													onChangeHanlder={
														handleCheckboxChange
													}
													sets={workout.sets}
													weightInLbs={
														workout.weightLbs
													}
													reps={workout.reps}
												/>
											),
										)}
									</div>
								</>
							)}

							<div className="flex-grow" />

							<div className="flex w-full justify-center rounded-tl-xl rounded-tr-xl bg-black">
								<button
									className="my-2 rounded-md bg-primaryButton p-3 font-medium  disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
									disabled={!allWorkoutsCompleted}
									onClick={() =>
										void handleCompleteSessionClick()
									}
								>
									Complete Session
								</button>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default WorkoutSessionDisplay;
