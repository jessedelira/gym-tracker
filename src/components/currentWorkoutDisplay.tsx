import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import HomePageSessionCard from './homePageSessionCard';

interface CurrentWorkoutDisplayProps {
	userId: string;
	currentDate: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	userId,
	currentDate,
}) => {
	// TODO: if you have multiple session that are possible you will need to query the completed sessions and compare vs active so you know which one to show as completed for the day

	const [sessionHasStarted, setSessionHasStarted] = useState(false);

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
	const { data: activeSessions } =
		api.activeSesssion.getActiveSessions.useQuery({
			userId: userId,
		});
	const addActiveSessionMutation =
		api.activeSesssion.addActiveSession.useMutation();

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		console.log(event.target.checked);
		console.log(event.target.value);
	};

	const handleStartSessionClick = (sessionId: string) => {
		setSessionHasStarted(true);
		addActiveSessionMutation.mutate({
			userId: userId,
			sessionId: sessionId,
		});
	};

	useEffect(() => {
		if (activeSessions && activeSessions.length > 0) {
			setSessionHasStarted(true);
		}
	}, [activeSessions]);

	return (
		<div>
			{!sessionHasStarted ? (
				<div className="flex flex-col  justify-center">
					{sessionsToStart &&
						sessionsToStart?.length > 0 &&
						sessionsToStart.map((session) => (
							<HomePageSessionCard
								key={session.id}
								sessionName={session.name}
								sessionDescription={session.description ?? ''}
								handleStartButtonClick={() =>
									handleStartSessionClick(session.id)
								}
							></HomePageSessionCard>
						))}
				</div>
			) : (
				<div className="mt-8">
					<h1 className="text-2xl">Today&apos;s Workout</h1>
					<div className="flex justify-center">
						<ul>
							{compiledWorkouts?.map((workout) => (
								<li
									key={workout.id}
									className="mb-2 flex items-center"
								>
									<input
										type="checkbox"
										className="mr-2 h-5 w-5 rounded"
										onChange={handleCheckboxChange}
									/>
									<div>
										<p className="font-bold">
											{
												exercises?.find(
													(exercise) =>
														exercise.id ===
														workout.exerciseId,
												)?.name
											}
										</p>
										<p>
											{workout.reps} reps x {workout.sets}{' '}
											sets
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentWorkoutDisplay;
