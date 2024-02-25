import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import {
	getExerciseInputElement,
	getRepsInputElement,
	getRoutineDescriptionInputElement,
	getRoutineNameInputElement,
	getSessionIdInputElement,
	getSetsInputElement,
	getWeightInputElement,
} from '~/utils/documentUtils';
import { api } from '~/utils/api';

const Workout: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();
	const exercises = api.exercise.getAllExercises.useQuery();
	const allSessions = api.session.getAllSessions.useQuery({
		userId: sessionData?.user.id ?? '',
	});
	const workoutMutation = api.workout.createWorkout.useMutation();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		getRoutineNameInputElement(document).value = '';
		getRoutineDescriptionInputElement(document).value = '';
	};

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const exerciseId = getExerciseInputElement(document).value;

			console.log(exerciseId);

			const createWorkoutData = {
				exerciseId: exerciseId,
				weight: Number(getWeightInputElement(document).value),
				reps: Number(getRepsInputElement(document).value),
				sets: Number(getSetsInputElement(document).value),
				sessionId: getSessionIdInputElement(document).value,
				userId: sessionData.user.id,
			};

			console.log(createWorkoutData);

			await workoutMutation.mutateAsync(createWorkoutData, {
				onSuccess: () => {
					void router.push('/manage/workouts');
				},
			});
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router]);

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<Layout sessionData={sessionData}>
					<div className="flex flex-col">
						<h1 className="pl-2 text-3xl font-bold">Create</h1>

						<h2 className="pl-2 text-2xl font-bold">
							Workout Information
						</h2>
						<form onSubmit={(e) => void handleSaveClicked(e)}>
							<div className="mat-4 flex">
								<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
									<label className="block pl-2 font-bold">
										Exercise
									</label>
									<select
										id="exerciseId"
										required
										className="rounded-md bg-gray-300 px-4 py-2 text-white"
									>
										{exercises
											? exercises.data?.map(
													(exercise) => (
														<option
															key={exercise.id}
															value={exercise.id}
														>
															{exercise.name}
														</option>
													),
											  )
											: null}
									</select>
								</div>
								<div className="mat-4 grid grid-cols-1">
									<label className="block pl-2 font-bold">
										Weight (lbs)
									</label>
									<input
										id="weightLbs"
										className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
										placeholder="3"
										onChange={handleInputChange}
										required
									></input>
								</div>
							</div>
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Reps
								</label>
								<input
									id="reps"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="3"
									onChange={handleInputChange}
									required
								></input>
							</div>
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Sets
								</label>
								<input
									id="sets"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="3"
									onChange={handleInputChange}
									required
								></input>
							</div>
							<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
								<label className="block pl-2 font-bold">
									Session to add workout to
								</label>
								<select
									id="sessionId"
									required
									className="rounded-md bg-gray-300 px-4 py-2 text-white"
								>
									{allSessions
										? allSessions.data?.map((session) => (
												<option
													key={session.id}
													value={session.id}
												>
													{session.name}
												</option>
										  ))
										: null}
								</select>
							</div>

							{dataChangeInForm ? (
								<div className="mt-4 grid grid-cols-2 gap-1">
									<button
										className="ml-2 rounded-md bg-green-700 px-4 py-2 text-white"
										type="submit"
									>
										Save
									</button>
									<button
										className="mr-2 rounded-md bg-red-700 px-4 py-2 text-white"
										onClick={handleCancelClicked}
									>
										Cancel
									</button>
								</div>
							) : null}
						</form>
					</div>
				</Layout>
			</>
		);
	}
};

export default Workout;
