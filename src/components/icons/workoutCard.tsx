import { ExerciseType } from '@prisma/client';

interface WorkoutCardProps {
	workoutId: string;
	exerciseName: string;
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sets?: number | null;
	weightInLbs?: number | null;
	reps?: number | null;
	durationSeconds?: number | null;
	exerciseType: ExerciseType;
	isChecked: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
	workoutId,
	exerciseName,
	onChangeHandler,
	sets,
	weightInLbs,
	reps,
	durationSeconds,
	exerciseType,
	isChecked,
}) => {
	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<h3 className="text-base font-medium text-gray-900">
						{exerciseName}
					</h3>
					<div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
						{exerciseType === ExerciseType.WEIGHTED ? (
							<>
								<span>{sets} sets</span>
								<span>{reps} reps</span>
								<span>{weightInLbs} lbs</span>
							</>
						) : (
							<span>{formatDuration(durationSeconds ?? 0)}</span>
						)}
					</div>
				</div>
				<div className="ml-4">
					<input
						type="checkbox"
						id={workoutId}
						checked={isChecked}
						className="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
						onChange={onChangeHandler}
					/>
				</div>
			</div>
		</div>
	);
};

export default WorkoutCard;
