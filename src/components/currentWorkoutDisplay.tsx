import { act, useEffect, useState } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';
import Spinner from './Spinner';
import { useRouter } from 'next/router';

// TODO: if you have multiple session that are possible you will need to query the completed sessions and compare vs active so you know which one to show as completed for the day

interface CurrentWorkoutDisplayProps {
	userId: string;
	currentDate: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	userId,
	currentDate,
}) => {
	// State
	const [allWorkoutsCompleted, setAllWorkoutsCompleted] = useState(false);
	const [sessionHasStarted, setSessionHasStarted] = useState(false);

	// Queries
	const { data: activeSession } =
		api.activeSesssion.getActiveSession.useQuery({
			userId: userId,
		});
	const { data: compiledWorkouts } =
		api.workout.getCompiledWorkoutsOfTheDay.useQuery({
			userId: userId,
			clientCurrentDate: currentDate,
		});
	const { data: exercises } = api.exercise.getAllExercises.useQuery();
	const { data: sessionsToStart } =
		api.session.getSessionsThatAreActiveOnDate.useQuery({
			userId: userId,
			date: currentDate,
		});

	// Mutations
	const addActiveSessionMutation =
		api.activeSesssion.addActiveSession.useMutation();
	const setWorkoutAsCompletedMutation =
		api.workout.setWorkoutAsCompleted.useMutation();
	const setWorkoutAsNotCompletedMutation =
		api.workout.setWorkoutAsNotCompleted.useMutation();

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const workoutId = event.target.id;
		const isNowChecked = event.target.checked;

		console.log('workoutId', workoutId);
		console.log('isNowChecked', isNowChecked);

		if (isNowChecked) {
			setWorkoutAsCompletedMutation.mutate({ workoutId });
		} else {
			setWorkoutAsNotCompletedMutation.mutate({ workoutId });
			event.target.removeAttribute('checked');
		}

		// TODO: have logic to check if all workoust are completed then set allWorkoutsCompleted to true, which will show a button that will allow the user to complete the session
		if (compiledWorkouts) {
			const allWorkoutsCompleted = compiledWorkouts.every((workout) => {
				return workout.isCompletedOnActiveSession;
			});
			console.log('allWorkoutsCompleted', allWorkoutsCompleted);
			setAllWorkoutsCompleted(allWorkoutsCompleted);
		}
	};

	const handleStartSessionClick = (sessionId: string) => {
		addActiveSessionMutation.mutate(
			{
				userId: userId,
				sessionId: sessionId,
			},
			{
				onSuccess: () => {
					setSessionHasStarted(true);
				},
			},
		);
	};

	useEffect(() => {
		if (compiledWorkouts) {
			compiledWorkouts.forEach((workout) => {
				if (workout.isCompletedOnActiveSession) {
					const checkbox = document.getElementById(workout.id);
					if (checkbox) {
						checkbox.setAttribute('checked', 'true');
					}
				}
			});
		}
	}, [
		activeSession,
		compiledWorkouts,
		sessionHasStarted,
		allWorkoutsCompleted,
	]);

	return (
		<div>
			{(activeSession === null || activeSession === undefined) &&
			sessionHasStarted === false ? (
				sessionsToStart?.length === 0 ? (
					<h1 className="flex justify-center font-medium">
						No sessions for today 🎉
					</h1>
				) : (
					<div className="flex flex-col justify-center">
						{sessionsToStart &&
							sessionsToStart?.length > 0 &&
							sessionsToStart.map((session) => (
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
				)
			) : (
				<div className="mt-8">
					<h1 className="text-2xl">
						Active Session: {activeSession?.session.name}
					</h1>
					<div className="flex justify-center flex-col ">
						<ul>
							{compiledWorkouts &&
								exercises &&
								compiledWorkouts.map((workout) => (
									<li
										key={workout.id}
										className="mb-2 flex items-center"
									>
										<input
											type="checkbox"
											id={workout.id}
											className="mr-2 h-5 w-5 rounded"
											onChange={handleCheckboxChange}
											onSelect={handleCheckboxChange}
										/>
										<div>
											<p className="font-bold">
												{
													exercises.find(
														(exercise) =>
															exercise.id ===
															workout.exerciseId,
													)?.name
												}
											</p>
											<p>
												{workout.weightLbs}
												{' Lbs'} : {workout.sets} sets x{' '}
												{workout.reps} reps
											</p>
										</div>
									</li>
								))}
						</ul>
						<div className="flex justify-center">
							{allWorkoutsCompleted && (
								<button className="roudned bg-red-500 p-4 font-medium">
									Complete Session
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentWorkoutDisplay;
