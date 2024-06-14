import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import {
	getSessionDescriptionInputElement,
	getSessionNameInputElement,
} from '~/utils/documentUtils';
import Spinner from '~/components/Spinner';
import PlusIcon from '~/components/icons/plusIcon';
import CreateWorkoutModal from '~/components/createWorkoutModal';
import TrashCanIcon from '~/components/icons/trashCanIcon';

interface CreateWorkoutData {
	exerciseId: string;
	weightLbs: number;
	reps: number;
	sets: number;
	id: number;
}

const Session: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const [newWorkoutData, setNewWorkoutData] = useState<CreateWorkoutData[]>(
		[],
	);
	const [showModal, setShowModal] = useState(false);
	const [sundayActive, setSundayActive] = useState(false);
	const [mondayActive, setMondayActive] = useState(false);
	const [tuesdayActive, setTuesdayActive] = useState(false);
	const [wednesdayActive, setWednesdayActive] = useState(false);
	const [thursdayActive, setThursdayActive] = useState(false);
	const [fridayActive, setFridayActive] = useState(false);
	const [saturdayActive, setSaturdayActive] = useState(false);
	const [workoutId, setWorkoutId] = useState(1);

	const router = useRouter();

	const createSessionMutation = api.session.createSession.useMutation();
	const createWorkoutManyMutation =
		api.workout.createManyWorkouts.useMutation();
	const { data: exercisesData } = api.exercise.getAllExercises.useQuery();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const newSessionName = getSessionNameInputElement(document).value;
			const newSessionDescription =
				getSessionDescriptionInputElement(document).value;

			const activeDays = [
				{ name: 'sunday', active: sundayActive },
				{ name: 'monday', active: mondayActive },
				{ name: 'tuesday', active: tuesdayActive },
				{ name: 'wednesday', active: wednesdayActive },
				{ name: 'thursday', active: thursdayActive },
				{ name: 'friday', active: fridayActive },
				{ name: 'saturday', active: saturdayActive },
			]
				.filter((day) => day.active)
				.map((day) => day.name);

			const createSessionData = {
				name: newSessionName,
				description: newSessionDescription,
				userId: sessionData.user.id,
				days: activeDays,
			};

			const createdSession = await createSessionMutation.mutateAsync(
				createSessionData,
			);

			// get the workouts that are in state and save them to the database

			// create object for new creation
			const createdSessionId = createdSession.id;
			const newWorkoutDataWithSessionId = newWorkoutData.map(
				(workout) => {
					return {
						...workout,
						sessionId: createdSessionId,
						userId: sessionData.user.id,
					};
				},
			);

			await createWorkoutManyMutation.mutateAsync(
				newWorkoutDataWithSessionId,
				{
					onSuccess: () => {
						void router.push('/manage/sessions');
					},
				},
			);
		}
	};

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		// TODO: Add a modal to confirm cancel and push back to manage/sessions
		void router.push('/manage/sessions');
	};

	const handlePlusButtonClicked = () => {
		setShowModal(true);
	};

	const handleButtonClicked = (elementId: string) => {
		const element = document.getElementById(elementId);
		if (element?.id === 'sunday') {
			setSundayActive(!sundayActive);
		}
		if (element?.id === 'monday') {
			setMondayActive(!mondayActive);
		}
		if (element?.id === 'tuesday') {
			setTuesdayActive(!tuesdayActive);
		}
		if (element?.id === 'wednesday') {
			setWednesdayActive(!wednesdayActive);
		}
		if (element?.id === 'thursday') {
			setThursdayActive(!thursdayActive);
		}
		if (element?.id === 'friday') {
			setFridayActive(!fridayActive);
		}
		if (element?.id === 'saturday') {
			setSaturdayActive(!saturdayActive);
		}

		element?.classList.toggle('bg-green-500');
		element?.classList.toggle('text-white');
	};

	const handleTrashCanClicked = (id: number) => {
		const newWorkoutDataFiltered = newWorkoutData.filter(
			(workout) => workout.id !== id,
		);
		setNewWorkoutData(newWorkoutDataFiltered);
	};

	const handleModalSaveClicked = (
		exerciseId: string,
		weightLbs: number,
		sets: number,
		reps: number,
	): void => {
		const newWorkout: CreateWorkoutData = {
			exerciseId: exerciseId,
			weightLbs: weightLbs,
			sets: sets,
			reps: reps,
			id: workoutId,
		};

		setNewWorkoutData([...newWorkoutData, newWorkout]);

		setWorkoutId(workoutId + 1);
		setShowModal(false);
	};

	if (!sessionData) {
		return <Spinner />;
	}

	return (
		<Layout>
			{showModal && (
				<CreateWorkoutModal
					onXClick={() => setShowModal(false)}
					onSaveClick={handleModalSaveClicked}
					exercises={exercisesData ?? []}
				></CreateWorkoutModal>
			)}
			<div className="flex flex-col">
				<div className="flex flex-row">
					<h1 className="pl-2 text-3xl font-bold">Create</h1>
				</div>
				<h2 className="pl-2 text-2xl font-bold">Session Information</h2>
				<form onSubmit={(e) => void handleSaveClicked(e)}>
					<div className="mat-4 flex">
						<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
							<label className="block font-bold">
								Session Name
							</label>
							<input
								id="sessionName"
								className=" rounded-md bg-gray-300 px-4 py-2 text-white"
								placeholder="Name"
								onChange={handleInputChange}
								required
							></input>
						</div>
					</div>
					<div className="mat-4 grid grid-cols-1">
						<label className="block pl-2 font-bold">
							Description
						</label>
						<textarea
							id="sessionDescription"
							className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
							placeholder="Description"
							onChange={handleInputChange}
							required
						></textarea>
					</div>

					{/* Select Date Section */}
					<div className="mat-4 grid grid-cols-1">
						<label className="block pl-2 font-bold">
							Day of the Week
						</label>
						<div className="mt-2 grid grid-cols-7">
							<label className="pl-2">
								<button
									id="sunday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									S
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="monday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									M
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="tuesday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									T
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="wednesday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									W
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="thursday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									T
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="friday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									F
								</button>
							</label>
							<label className=" pl-2">
								<button
									id="saturday"
									type="button"
									className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
									onChange={handleInputChange}
									onClick={(e) =>
										handleButtonClicked(e.currentTarget.id)
									}
								>
									S
								</button>
							</label>
						</div>
					</div>

					{/* Create Workout Section */}
					{(sundayActive ||
						mondayActive ||
						tuesdayActive ||
						wednesdayActive ||
						thursdayActive ||
						fridayActive ||
						saturdayActive) && (
						<div className="mt-4">
							<h2 className="flex justify-center text-xl font-medium">
								Workouts
							</h2>
							<div className="m-2 flex justify-center rounded-md bg-lime-300 ">
								<button
									className="flex w-full justify-center"
									type="button"
									onClick={() =>
										void handlePlusButtonClicked()
									}
								>
									<PlusIcon />
								</button>
							</div>
						</div>
					)}

					{/* Workouts set to be saved Section */}
					{newWorkoutData.length !== 0 && (
						<div className="mx-2 max-h-64 overflow-y-auto rounded-md shadow-md sm:rounded-lg">
							<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
								<tbody>
									{newWorkoutData &&
										newWorkoutData.map((workout) => (
											<tr
												key={workout.exerciseId}
												className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
											>
												<th
													scope="row"
													className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
												>
													{
														exercisesData?.find(
															(exercise) =>
																exercise.id ===
																workout.exerciseId,
														)?.name
													}{' '}
													- {workout.sets} x{' '}
													{workout.reps}
												</th>
												<td className="grid grid-cols-2 px-6 py-4 text-right">
													<button
														className="ml-4 h-6 w-6  rounded-full pl-1"
														onClick={() =>
															handleTrashCanClicked(
																workout.id,
															)
														}
													>
														<TrashCanIcon
															heightValue={'6'}
															widthValue={'6'}
														></TrashCanIcon>
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					)}

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
	);
};

export default Session;
