interface WorkoutCardProps {
	workoutId: string;
	exerciseName: string;
	onChangeHanlder: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sets: number;
	weightInLbs: number;
	reps: number;
	isChecked: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
	workoutId,
	exerciseName,
	onChangeHanlder,
	sets,
	weightInLbs,
	reps,
	isChecked,
}) => {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<h3 className="text-base font-medium text-gray-900">
						{exerciseName}
					</h3>
					<div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
						<span>{sets} sets</span>
						<span>{reps} reps</span>
						<span>{weightInLbs} lbs</span>
					</div>
				</div>
				<div className="ml-4">
					<input
						type="checkbox"
						id={workoutId}
						checked={isChecked}
						className="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
						onChange={onChangeHanlder}
					/>
				</div>
			</div>
		</div>
	);
};

export default WorkoutCard;
