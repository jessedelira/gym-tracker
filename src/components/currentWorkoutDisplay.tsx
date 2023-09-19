const CurrentWorkoutDisplay: React.FC = () => {
	interface IWorkout {
		id: number;
		name: string;
		reps: number;
		sets: number;
	}

	const workoutList: IWorkout[] = [
		{
			id: 1,
			name: 'Bench Press',
			reps: 5,
			sets: 5,
		},
		{
			id: 2,
			name: 'Squat',
			reps: 5,
			sets: 5,
		},
		{
			id: 3,
			name: 'Deadlift',
			reps: 5,
			sets: 5,
		},
	];

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.checked);
		console.log(event.target.value);

		// how to get data of the specific workout that was checked?
		

	}

	return (
		<div>
			Today&apos;s Workout
			<ul>
				{workoutList.map((workout) => (
					<li key={workout.id} className="mb-2 flex items-center">
						<input
							type="checkbox"
							className="form-checkbox mr-2 h-5 w-5 text-blue-600"
							onChange={handleCheckboxChange}
						/>
						<div>
							<p className="font-bold">{workout.name}</p>
							<p>
								{workout.reps} reps x {workout.sets} sets
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CurrentWorkoutDisplay;
