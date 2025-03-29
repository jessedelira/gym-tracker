interface WorkoutCardProps {
	workoutId: string;
	exerciseName: string;
	onChangeHanlder: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sets: number;
	weightInLbs: number;
	reps: number;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
	workoutId,
	exerciseName,
	onChangeHanlder,
	sets,
	weightInLbs,
	reps,
}) => {
	return (
		<div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<h3 className="text-base font-medium text-gray-900">
						{exerciseName}
					</h3>
					<div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
						<div className="flex items-center">
							<svg
								className="mr-1.5 h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 8h16M4 16h16"
								/>
							</svg>
							<span>{sets} sets</span>
						</div>
						<div className="flex items-center">
							<svg
								className="mr-1.5 h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							<span>{reps} reps</span>
						</div>
						<div className="flex items-center">
							<svg
								className="mr-1.5 h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
								/>
							</svg>
							<span>{weightInLbs} lbs</span>
						</div>
					</div>
				</div>
				<div className="ml-4">
					<input
						type="checkbox"
						id={workoutId}
						className="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
						onChange={onChangeHanlder}
					/>
				</div>
			</div>
		</div>
	);
};

export default WorkoutCard;
