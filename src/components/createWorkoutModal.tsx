import React, { type FormEvent } from 'react';
import XIcon from './icons/xIcon';
import {
	getExerciseInputElement,
	getRepsInputElement,
	getSetsInputElement,
	getWeightInputElement,
} from '~/utils/documentUtils';
import { type Exercise } from '@prisma/client';
import SearchableDropdown from './searchableDropdown';

interface CreateWorkoutModalProps {
	onXClick: () => void;
	onSaveClick: (
		exerciseId: string,
		weightLbs: number,
		sets: number,
		reps: number,
	) => void;
	exercises: Exercise[];
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
	onXClick,
	onSaveClick,
	exercises,
}) => {
	const handleSaveButtonClicked = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const exerciseId = getExerciseInputElement(document).value;
		const weightLbs = Number(getWeightInputElement(document).value);
		const sets = Number(getSetsInputElement(document).value);
		const reps = Number(getRepsInputElement(document).value);

		onSaveClick(exerciseId, weightLbs, sets, reps);
	};

	return (
		<>
			<div className="fixed inset-0 z-10 flex items-center justify-center">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="z-10 max-w-[23rem] rounded-lg bg-white p-2">
					<div className="flex flex-col justify-start">
						<button onClick={() => onXClick()}>
							<XIcon></XIcon>
						</button>
					</div>
					<h1 className="text-center text-2xl text-black">
						Create Workout
					</h1>
					<form onSubmit={(e) => void handleSaveButtonClicked(e)}>
						<div className="flex">
							<div className=" mr-2 grid grid-cols-1 pl-2">
								<label className="block font-bold">
									Exercise
								</label>
								<select
									id="exerciseId"
									required
									className="rounded-md bg-gray-300  py-2 text-black"
								>
									{exercises
										? exercises?.map((exercise) => (
												<option
													key={exercise.id}
													value={exercise.id}
												>
													{exercise.name}
												</option>
										  ))
										: null}
								</select>
							</div>
							<div className=" grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Weight (lbs)
								</label>
								<input
									id="weightLbs"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-black"
									placeholder="75"
									required
								></input>
							</div>
						</div>
						<div className="flex">
							<div className="grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Sets
								</label>
								<input
									id="sets"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-black"
									placeholder="3"
									required
								></input>
							</div>
							<div className="grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Reps
								</label>
								<input
									id="reps"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-black"
									placeholder="10"
									required
								></input>
							</div>
						</div>

						<div className="mt-2 flex justify-center">
							<button
								type="submit"
								className="rounded-md bg-green-400 px-4 py-2 text-black"
							>
								Save
							</button>
						</div>
					</form>

					<SearchableDropdown
						exercises={exercises}
					></SearchableDropdown>
				</div>
			</div>
		</>
	);
};

export default CreateWorkoutModal;
