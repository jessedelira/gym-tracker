import { api } from '~/utils/api';

interface CurrentWorkoutDisplayProps {
	userId: string;
	currentDate: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentWorkoutDisplayProps> = ({
	userId,
	currentDate,
}) => {
	const { data: compiledWorkouts } =
		api.workout.getCompiledWorkoutsOfTheDay.useQuery({
			userId: userId,
			clientCurrentDate: currentDate,
		});

	const { data: exercises } = api.exercise.getAllExercises.useQuery();

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		console.log(event.target.checked);
		console.log(event.target.value);
	};

	return (
		<div className="mt-8">
			<h1 className="text-2xl">Today&apos;s Workout</h1>
			<div className="flex justify-center">
				<ul>
					{compiledWorkouts?.map((workout) => (
						<li key={workout.id} className="mb-2 flex items-center">
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
									{workout.reps} reps x {workout.sets} sets
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CurrentWorkoutDisplay;
