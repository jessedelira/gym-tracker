import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';
import SmallSpinner from './smallSpinner';
import JSConfetti from 'js-confetti';
import { type User } from 'next-auth';
import { Preference } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';

interface CurrentWorkoutDisplayProps {
	user: User;
	currentDate: Date;
}

/**
 * TODO: Try to save the page state with localStorage and then you will
 * be able to see the button enabled instantly when all are clicked then have a
 * mutation to update the database after for all the workouts
 *
 */

const CurrentWorkoutDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	user,
	currentDate,
}) => {
	//#region Queries
	const {
		data: possibleSessionsToStart,
		isFetched: isPossibleSessionsToStartFetched,
		isLoading: isPossibleSessionsToStartLoading,
		isFetching: isPossibleSessionsToStartFetching,
	} = api.session.getSessionsThatAreActiveOnDate.useQuery({
		userId: user.id,
		date: currentDate,
	});
	const {
		data: activeSessionData,
		isLoading: activeSessionDataIsLoading,
		isFetching: isActiveSessionDataFetching,
		refetch: refetchActiveSessionData,
	} = api.activeSesssion.getActiveSession.useQuery({
		userId: user.id,
	});
	const {
		data: listOfCompletedSessionIdsForActiveRoutine,
		isFetched: isListOfCompletedSessionIdsForActiveRoutineLoadingFetched,
		isLoading: isListOfCompletedSessionIdsForActiveRoutineLoading,
		isFetching: isListOfCompletedSessionIdsForActiveRoutineFetching,
		refetch: refetchListOfCompletedSessionIdsForActiveRoutine,
	} = api.completedSession.getListOfÇompletedSessionIdsForActiveRoutine.useQuery(
		{
			userId: user.id,
			currentDate: currentDate,
		},
	);
	const {
		data: workoutsForActiveSession,
		isLoading: workoutsForActiveSessionIsLoading,
		isFetched: isworkoutsForActiveSessionFetched,
		refetch: refetchWorkoutsForActiveSession,
	} = api.workout.getWorkoutsForActiveSession.useQuery({
		userId: user.id,
		clientCurrentDate: currentDate,
		sessionId: activeSessionData?.session.id ?? '',
	});
	//#endregion

	//#region Mutations
	const {
		mutateAsync: addActiveSessionMutationAsync,
		isLoading: isLoadingActiveSessionMutationAsync,
	} = api.activeSesssion.addActiveSession.useMutation();
	// const setWorkoutAsCompletedMutation =
	// 	api.workout.setWorkoutAsCompleted.useMutation();
	// const setWorkoutAsNotCompletedMutation =
	// 	api.workout.setWorkoutAsNotCompleted.useMutation();
	const createCompletedSessionMutation =
		api.completedSession.createCompletedSession.useMutation();
	//#endregion

	//#region UI Handlers
	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;

		if (isNowChecked) {
			const workoutCompletionMap = JSON.parse(
				localStorage.getItem('workoutCompletionMap') || '[]',
			) as [string, boolean][];
			const updatedWorkoutCompletionMap = workoutCompletionMap.map(
				([id, isCompleted]) => {
					if (id === workoutId) {
						return [id, true];
					}
					return [id, isCompleted];
				},
			);

			console.log(
				'updatedWorkoutCompletionMap',
				updatedWorkoutCompletionMap,
			);

			localStorage.setItem(
				'workoutCompletionMap',
				JSON.stringify(updatedWorkoutCompletionMap),
			);

			// void setWorkoutAsCompletedMutation.mutate({ workoutId });
		} else {
			const workoutCompletionMap = JSON.parse(
				localStorage.getItem('workoutCompletionMap') || '[]',
			) as [string, boolean][];

			const updatedWorkoutCompletionMap = workoutCompletionMap.map(
				([id, isCompleted]) => {
					if (id === workoutId) {
						return [id, false];
					}
					return [id, isCompleted];
				},
			);

			localStorage.setItem(
				'workoutCompletionMap',
				JSON.stringify(updatedWorkoutCompletionMap),
			);
			event.target.removeAttribute('checked');
		}

		const workoutCompletionMap = JSON.parse(
			localStorage.getItem('workoutCompletionMap') || '[]',
		) as [string, boolean][];

		const areAllWorkoutsChecked = workoutCompletionMap.every((element) => {
			console.log(element);

			return element[1] === true;
		});

		console.log('areAllWorkoutsChecked', areAllWorkoutsChecked);

		setAllWorkoutsCompleted(areAllWorkoutsChecked);
	};

	const handleCheckboxChangeWrapper = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		void handleCheckboxChange(event);
	};

	const handleStartSessionClick = async (sessionId: string) => {
		await addActiveSessionMutationAsync(
			{
				userId: user.id,
				sessionId: sessionId,
			},
			{
				onSuccess: () => {
					setSessionHasStarted(true);
					setAllWorkoutsCompleted(false);
				},
			},
		);
		await refetchActiveSessionData();
	};

	const handleCompleteSessionClick = async () => {
		const jsConfetti = new JSConfetti();
		if (userHasConfettiPreferenceEnabled) {
			void jsConfetti.addConfetti({
				confettiRadius: 10,
				confettiNumber: 20,
				emojis: ['🎉', '🎊'],
				emojiSize: 50,
			});
		}
		if (!activeSessionData) return;

		await createCompletedSessionMutation.mutateAsync({
			userId: user.id,
			sessionId: activeSessionData.session.id,
		});
		await Promise.all([
			refetchActiveSessionData(),
			refetchWorkoutsForActiveSession(),
			refetchListOfCompletedSessionIdsForActiveRoutine(),
		]);

		setSessionHasStarted(false);
		setAllWorkoutsCompleted(false);
	};

	const handleCompleteSessionClickWrapper = () => {
		void handleCompleteSessionClick();
	};
	//#endregion
	console.log('start')
	if (workoutsForActiveSession && workoutsForActiveSession.length > 0) {
		if (localStorage.getItem('workoutCompletionMap') !== null) {
			console.log('hi');
		} else {
			console.log('bye')
			// populate the map
			const workoutCompletionMap = workoutsForActiveSession.map(
				(workout) => {
					return [workout.id, workout.isCompletedOnActiveSession];
				},
			);

			localStorage.setItem(
				'workoutCompletionMap',
				JSON.stringify(workoutCompletionMap),
			);
		}
	} else {
		localStorage.removeItem('workoutCompletionMap');
	}

	const userHasConfettiPreferenceEnabled = user.userPreferences?.some(
		(preference) =>
			preference.preference ===
				Preference.CONFETTI_ON_SESSION_COMPLETION &&
			preference.enabled === true,
	);

	const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);
	const [sessionHasStarted, setSessionHasStarted] = useState(false);

	const isDataLoading = (): boolean => {
		return (
			activeSessionDataIsLoading ||
			workoutsForActiveSessionIsLoading ||
			isPossibleSessionsToStartLoading ||
			isListOfCompletedSessionIdsForActiveRoutineLoading ||
			isLoadingActiveSessionMutationAsync ||
			!isListOfCompletedSessionIdsForActiveRoutineLoadingFetched ||
			!isPossibleSessionsToStartFetched ||
			!isworkoutsForActiveSessionFetched ||
			isActiveSessionDataFetching ||
			isPossibleSessionsToStartFetching ||
			isListOfCompletedSessionIdsForActiveRoutineFetching ||
			activeSessionData === undefined
		);
	};

	useEffect(() => {
		if (workoutsForActiveSession) {
			workoutsForActiveSession.forEach((workout) => {
				const workoutCompletionMap = JSON.parse(
					localStorage.getItem('workoutCompletionMap') || '[]',
				) as [string, boolean][];

				const workoutCompletionObj = workoutCompletionMap.find(
					([id]) => id === workout.id,
				);

				if (workoutCompletionObj && workoutCompletionObj[1]) {
					const checkbox = document.getElementById(workout.id);
					if (checkbox) {
						checkbox.setAttribute('checked', 'true');
					}
				}

				const allWorkoutsCompleted = JSON.parse(
					localStorage.getItem('workoutCompletionMap') || '[]',
				) as [string, boolean][];

				const areAllWorkoutsCompleted = allWorkoutsCompleted.every(
					(element) => {
						console.log(element);
						return element[1] === true;
					},
				);

				setAllWorkoutsCompleted(areAllWorkoutsCompleted);
			});
		}
	}, [activeSessionData, workoutsForActiveSession]);

	if (isDataLoading()) {
		return <SmallSpinner />;
	}

	return (
		<>
			{possibleSessionsToStart && possibleSessionsToStart.length === 0 ? (
				<h1 className="flex justify-center font-medium">
					No sessions for today 🎉
				</h1>
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
										isCompleted={listOfCompletedSessionIdsForActiveRoutine?.includes(
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
									<div className="hide-scrollbar mb-4 overflow-auto rounded-md">
										{workoutsForActiveSession.map(
											(workout) => (
												<WorkoutCard
													key={workout.id}
													workoutId={workout.id}
													exerciseName={
														workout.exercise.name
													}
													onChangeHanlder={
														handleCheckboxChangeWrapper
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
									className="my-2 rounded-md bg-green-300 p-3 font-medium  disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
									disabled={!allWorkoutsCompleted}
									onClick={handleCompleteSessionClickWrapper}
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

export default CurrentWorkoutDisplay;
