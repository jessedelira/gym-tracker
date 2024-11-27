import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';
import SmallSpinner from './smallSpinner';
import JSConfetti from 'js-confetti';
import Image from 'next/image';
import { type User } from 'next-auth';
import { Preference } from '@prisma/client';
import CurrentSessionElapsedTimer from './currentSessionElapsedTimer';
import WorkoutCard from './icons/workoutCard';

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
	} = api.completedSession.getListOfCompletedSessionIdsForActiveRoutine.useQuery(
		{
			userId: user.id,
			currentDate: currentDate,
		},
	);
	const {
		data: activeRoutine,
		isLoading: activeRoutineIsLoading,
		isFetching: isActiveRoutineFetching,
		isFetched: isactiveRoutineFetched,
	} = api.routine.getActiveRoutine.useQuery({
		userId: user.id,
	});
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

			localStorage.setItem(
				'workoutCompletionMap',
				JSON.stringify(updatedWorkoutCompletionMap),
			);
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
			return element[1] === true;
		});

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
		localStorage.removeItem('workoutCompletionMap');
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

		localStorage.removeItem('workoutCompletionMap');
		setSessionHasStarted(false);
		setAllWorkoutsCompleted(false);
	};

	const handleCompleteSessionClickWrapper = () => {
		void handleCompleteSessionClick();
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
			activeRoutineIsLoading ||
			isActiveRoutineFetching ||
			!isactiveRoutineFetched
		);
	};

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

	if (isDataLoading()) {
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
						{/* how to addd a gif here */}
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

									<div className="hide-scrollbar overflow-auto rounded-md pb-4">
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
									className="my-2 rounded-md bg-primaryButton p-3 font-medium  disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
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

export default WorkoutSessionDisplay;
