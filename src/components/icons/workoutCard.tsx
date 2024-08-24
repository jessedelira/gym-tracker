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
		<div
			key={workoutId}
			className="mt-6 w-80 overflow-hidden rounded-lg bg-[#f5f5f5] shadow-lg"
		>
			<div className="p-6 md:p-8">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-lg font-semibold">{exerciseName}</h3>
					<div className="flex items-center">
						<input
							type="checkbox"
							id={workoutId}
							className="text-primary h-4 w-4 rounded border-gray-300"
							onChange={onChangeHanlder}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 text-sm text-[#666666]">
					<div>Reps: {reps}</div>
					<div className="text-right">Sets: {sets}</div>
					<div>Weight: {weightInLbs} lbs</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutCard;
