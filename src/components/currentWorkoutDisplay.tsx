import { api } from '~/utils/api';

const CurrentWorkoutDisplay: React.FC = () => {
	const { data: compiledWorkouts } =
		api.workout.getCompiledWorkoutsOfTheDay.useQuery({
			userId: 'clw3v31uo00005hyignh0oukl',
			clientCurrentDate: new Date(2024, 5, 14),
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
