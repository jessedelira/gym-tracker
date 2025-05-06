import React, { useState, type FormEvent } from 'react';
import XIcon from './icons/xIcon';
import { type Exercise, ExerciseType } from '@prisma/client';
import SearchableDropdown from './searchableDropdown';

interface CreateWorkoutModalProps {
	onXClick: () => void;
	onSaveClick: (workoutData: {
		exerciseId: string;
		weightLbs?: number;
		sets?: number;
		reps?: number;
		durationSeconds?: number;
	}) => void;
	exercises: Exercise[];
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
	onXClick,
	onSaveClick,
	exercises,
}) => {
	const [exerciseSelectedId, setExerciseSelectedId] = useState('');
	const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
		null,
	);

	const handleSearchableDropdownSelect = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setExerciseSelectedId(e.target.value);
		const exercise = exercises.find((ex) => ex.id === e.target.value);
		setSelectedExercise(exercise ?? null);
	};

	const handleSaveButtonClicked = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (selectedExercise?.type === ExerciseType.WEIGHTED) {
			onSaveClick({
				exerciseId: exerciseSelectedId,
				weightLbs: Number(formData.get('weightLbs')),
				sets: Number(formData.get('sets')),
				reps: Number(formData.get('reps')),
			});
		} else {
			onSaveClick({
				exerciseId: exerciseSelectedId,
				durationSeconds: Number(formData.get('duration')) * 60, // Convert minutes to seconds
			});
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
			{/* Overlay */}
			<div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>

			{/* Modal */}
			<div className="relative z-50 w-full max-w-lg rounded-3xl bg-white shadow-xl">
				{/* Header */}
				<div className="px-6 pt-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-semibold tracking-tight text-gray-900">
								Add Workout
							</h2>
							<p className="mt-2 text-gray-600">
								Configure your workout details
							</p>
						</div>
						<button
							onClick={onXClick}
							className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
						>
							<XIcon />
						</button>
					</div>
				</div>

				{/* Form */}
				<form
					onSubmit={(e) => void handleSaveButtonClicked(e)}
					className="p-6"
				>
					{/* Exercise Selection */}
					<div className="mb-6">
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Exercise*
						</label>
						<SearchableDropdown
							exercises={exercises}
							onInputSelect={handleSearchableDropdownSelect}
						/>
					</div>

					{selectedExercise?.type === ExerciseType.WEIGHTED ? (
						<>
							{/* Weight Input */}
							<div className="mb-6">
								<label className="mb-2 block text-sm font-medium text-gray-900">
									Weight (lbs)*
								</label>
								<input
									name="weightLbs"
									type="number"
									min="0"
									className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3"
									placeholder="Enter weight"
									required
								/>
							</div>

							{/* Sets and Reps */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="mb-2 block text-sm font-medium text-gray-900">
										Sets*
									</label>
									<input
										name="sets"
										type="number"
										min="1"
										className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3"
										placeholder="Sets"
										required
									/>
								</div>
								<div>
									<label className="mb-2 block text-sm font-medium text-gray-900">
										Reps*
									</label>
									<input
										name="reps"
										type="number"
										min="1"
										className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3"
										placeholder="Reps"
										required
									/>
								</div>
							</div>
						</>
					) : (
						<div className="mb-6">
							<label className="mb-2 block text-sm font-medium text-gray-900">
								Duration (minutes)*
							</label>
							<input
								name="duration"
								type="number"
								min="1"
								step="0.5"
								className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3"
								placeholder="Enter duration in minutes"
								required
							/>
						</div>
					)}

					{/* Action Buttons */}
					<div className="mt-8 flex space-x-4">
						<button
							type="submit"
							className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Add Workout
						</button>
						<button
							type="button"
							onClick={onXClick}
							className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateWorkoutModal;
