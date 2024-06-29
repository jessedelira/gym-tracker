import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';
import { type Workout } from '@prisma/client';
import SmallSpinner from './smallSpinner';

interface CurrentWorkoutDisplayProps {
	userId: string;
	currentDate: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	userId,
	currentDate,
}) => {
	const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);
	const [sessionHasStarted, setSessionHasStarted] = useState(false);
	const [activeSession, setActiveSession] = useState<
		| ({
				session: {
					id: string;
					createdAt: Date;
					name: string;
					description: string | null;
					routineId: string | null;
					userId: string;
				};
		  } & {
				id: string;
				startedAt: Date;
				sessionId: string;
				userId: string;
		  })
		| null
	>(null);
	const [workoutsForActiveSessionState, setWorkoutsForActiveSessionState] =
		useState<Workout[]>([]);

	const {
		data: workoutsForActiveSession,
		isLoading: workoutsForActiveSessionIsLoading,
		refetch: refetchWorkoutsForActiveSession,
	} = api.workout.getWorkoutsForActiveSession.useQuery({
		userId: userId,
		clientCurrentDate: currentDate,
		sessionId: activeSession?.session.id ?? '',
	});
	const {
		data: activeSessionData,
		isLoading: activeSessionDataIsLoading,
		refetch,
	} = api.activeSesssion.getActiveSession.useQuery({
		userId: userId,
	});
	const { data: possibleSessionsToStart } =
		api.session.getSessionsThatAreActiveOnDate.useQuery({
			userId: userId,
			date: currentDate,
		});

	const addActiveSessionMutation =
		api.activeSesssion.addActiveSession.useMutation();
	const setWorkoutAsCompletedMutation =
		api.workout.setWorkoutAsCompleted.useMutation();
	const setWorkoutAsNotCompletedMutation =
		api.workout.setWorkoutAsNotCompleted.useMutation();
	const createCompletedSessionMutation =
		api.completedSession.createCompletedSession.useMutation();

	const handleCheckboxChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;

		if (isNowChecked) {
			await setWorkoutAsCompletedMutation.mutateAsync({ workoutId });
		} else {
			await setWorkoutAsNotCompletedMutation.mutateAsync({ workoutId });
			event.target.removeAttribute('checked');
		}

		setWorkoutsForActiveSessionState((prev) =>
			prev.map((workout) =>
				workout.id === workoutId
					? { ...workout, isCompletedOnActiveSession: isNowChecked }
					: workout,
			),
		);

		const allWorkoutsCompleted = workoutsForActiveSessionState?.every(
			(workout) => {
				if (workout.isCompletedOnActiveSession) {
					return workout.isCompletedOnActiveSession;
				} else if (workout.id === workoutId) {
					return true;
				} else {
					return false;
				}
			},
		);

		setAllWorkoutsCompleted(allWorkoutsCompleted ?? false);
		await refetchWorkoutsForActiveSession();
	};

	const handleCheckboxChangeWrapper = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		void handleCheckboxChange(event);
	};

	const handleStartSessionClick = async (sessionId: string) => {
		await addActiveSessionMutation.mutateAsync(
			{
				userId: userId,
				sessionId: sessionId,
			},
			{
				onSuccess: () => {
					setSessionHasStarted(true);
					setAllWorkoutsCompleted(false);
					setWorkoutsForActiveSessionState([]);
				},
			},
		);
		await refetch();
	};

	const handleCompleteSessionClick = async () => {
		await createCompletedSessionMutation.mutateAsync({
			userId: userId,
			sessionId: activeSessionData?.session.id ?? '',
		});
		await refetch();
		setActiveSession(null);
		setSessionHasStarted(false);
		setAllWorkoutsCompleted(false);
		setWorkoutsForActiveSessionState([]);
	};

	const handleCompleteSessionClickWrapper = () => {
		void handleCompleteSessionClick();
	};

	useEffect(() => {
		if (activeSessionData && !activeSession) {
			setSessionHasStarted(true);
			setActiveSession(activeSessionData);
		}

		if (workoutsForActiveSession) {
			setWorkoutsForActiveSessionState(workoutsForActiveSession);
			workoutsForActiveSession.forEach((workout) => {
				if (workout.isCompletedOnActiveSession) {
					const checkbox = document.getElementById(workout.id);
					if (checkbox) {
						checkbox.setAttribute('checked', 'true');
					}
				}
			});
		}

		const areAllWorkoutsCompleted = workoutsForActiveSession?.every(
			(workout) => workout.isCompletedOnActiveSession,
		);
		setAllWorkoutsCompleted(areAllWorkoutsCompleted ?? false);
		console.log('--------------------------------------------------');
	}, [workoutsForActiveSession, activeSessionData, activeSession]);

	if (
		activeSessionDataIsLoading ||
		workoutsForActiveSessionIsLoading 
	) {
		return <SmallSpinner />;
	}

	return (
		<div>
			{/* If no session on on that day show this message */}
			{possibleSessionsToStart?.length === 0 ? (
				<h1 className="flex justify-center font-medium">
					No sessions for today 🎉
				</h1>
			) : (
				<div>
					{/* If activeSession state is null and the sessionHasStarted is false show the cards for possible sessions */}
					{activeSession === null && sessionHasStarted === false ? (
						<div className="flex flex-col justify-center">
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
									></HomePageSessionCard>
								))}
						</div>
					) : (
						<div>
							<div className="mt-8">
								<h1 className="text-2xl">
									Active Session:{' '}
									{activeSessionData?.session.name}
								</h1>
								<div className="grid grid-cols-1">
									<div className="flex justify-center ">
										<ul>
											{workoutsForActiveSession &&
												workoutsForActiveSession.map(
													(workout) => (
														<li
															key={workout.id}
															className="mb-2 flex items-center"
														>
															<input
																type="checkbox"
																id={workout.id}
																className="mr-2 h-5 w-5 rounded"
																onChange={
																	handleCheckboxChangeWrapper
																}
															/>
															<div>
																<p className="font-bold">
																	{
																		workout.exercise.name
																	}
																</p>
																<p>
																	{
																		workout.weightLbs
																	}
																	{' Lbs'} :{' '}
																	{
																		workout.sets
																	}{' '}
																	sets x{' '}
																	{
																		workout.reps
																	}{' '}
																	reps
																</p>
															</div>
														</li>
													),
												)}
										</ul>
									</div>
									<div className="flex justify-center">
										{allWorkoutsCompleted && (
											<button
												className="rounded bg-lime-300 p-3 font-medium"
												onClick={
													handleCompleteSessionClickWrapper
												}
											>
												Complete Session
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CurrentWorkoutDisplay;
