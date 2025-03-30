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
// import PlusIcon from '~/components/icons/plusIcon';
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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
			setErrorMessage(null);

			// Validate at least one day is selected
			const hasSelectedDay = [
				sundayActive,
				mondayActive,
				tuesdayActive,
				wednesdayActive,
				thursdayActive,
				fridayActive,
				saturdayActive,
			].some((day) => day);

			if (!hasSelectedDay) {
				setErrorMessage('Please select at least one day of the week');
				return;
			}

			// Validate at least one workout is added when days are selected
			if (hasSelectedDay && newWorkoutData.length === 0) {
				setErrorMessage(
					'Please add at least one workout to your session',
				);
				return;
			}

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

			try {
				const createdSession = await createSessionMutation.mutateAsync(
					createSessionData,
					{
						onError: (error) => {
							console.error('Session creation error:', error);
							setErrorMessage(
								'Failed to create session. Please try again.',
							);
						},
					},
				);

				// Create workouts only if session was created successfully
				if (createdSession) {
					const newWorkoutDataWithSessionId = newWorkoutData.map(
						(workout) => ({
							...workout,
							sessionId: createdSession.id,
							userId: sessionData.user.id,
						}),
					);

					await createWorkoutManyMutation.mutateAsync(
						newWorkoutDataWithSessionId,
						{
							onSuccess: () => {
								void router.push('/manage/sessions');
							},
							onError: (error) => {
								console.error('Workout creation error:', error);
								setErrorMessage(
									'Failed to create workouts. Please try again.',
								);
							},
						},
					);
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message.includes('Unique constraint')) {
						setErrorMessage(
							'A session with this name already exists',
						);
					} else {
						setErrorMessage(
							'An error occurred while creating the session',
						);
						console.error('Detailed error:', error);
					}
				}
			}
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

	const handleButtonClicked = (dayId: string) => {
		setDataChangeInForm(true);
		switch (dayId) {
			case 'sunday':
				setSundayActive(!sundayActive);
				break;
			case 'monday':
				setMondayActive(!mondayActive);
				break;
			case 'tuesday':
				setTuesdayActive(!tuesdayActive);
				break;
			case 'wednesday':
				setWednesdayActive(!wednesdayActive);
				break;
			case 'thursday':
				setThursdayActive(!thursdayActive);
				break;
			case 'friday':
				setFridayActive(!fridayActive);
				break;
			case 'saturday':
				setSaturdayActive(!saturdayActive);
				break;
		}
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
				/>
			)}
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Create New Session
					</h1>
					<p className="mt-2 text-gray-600">
						Set up your workout session and schedule
					</p>
				</div>

				<form
					onSubmit={(e) => void handleSaveClicked(e)}
					className="space-y-6"
				>
					{/* Error Message Banner */}
					{errorMessage && (
						<div className="rounded-xl border border-red-200 bg-red-50 p-4">
							<div className="flex">
								<div className="ml-3">
									<h3 className="text-sm font-medium text-red-800">
										{errorMessage}
									</h3>
								</div>
							</div>
						</div>
					)}

					{/* Main Form Content */}
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						{/* Session Name */}
						<div className="mb-6">
							<label
								htmlFor="sessionName"
								className="mb-2 block text-sm font-medium text-gray-900"
							>
								Session Name*
							</label>
							<input
								id="sessionName"
								className={`w-full rounded-xl border-2 ${
									errorMessage
										? 'border-red-300 bg-red-50'
										: 'border-gray-200 bg-white'
								} px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
								placeholder="Enter session name"
								onChange={() => {
									handleInputChange();
									if (errorMessage) setErrorMessage(null);
								}}
								required
							/>
						</div>

						{/* Description */}
						<div className="mb-6">
							<label
								htmlFor="sessionDescription"
								className="mb-2 block text-sm font-medium text-gray-900"
							>
								Description (optional)
							</label>
							<textarea
								id="sessionDescription"
								className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								placeholder="Describe your session"
								rows={3}
								onChange={handleInputChange}
							/>
						</div>

						{/* Days Selection */}
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-900">
								Days of the Week*
							</label>
							<div className="grid grid-cols-7 gap-2">
								{[
									{
										id: 'sunday',
										label: 'S',
										isActive: sundayActive,
									},
									{
										id: 'monday',
										label: 'M',
										isActive: mondayActive,
									},
									{
										id: 'tuesday',
										label: 'T',
										isActive: tuesdayActive,
									},
									{
										id: 'wednesday',
										label: 'W',
										isActive: wednesdayActive,
									},
									{
										id: 'thursday',
										label: 'T',
										isActive: thursdayActive,
									},
									{
										id: 'friday',
										label: 'F',
										isActive: fridayActive,
									},
									{
										id: 'saturday',
										label: 'S',
										isActive: saturdayActive,
									},
								].map((day) => (
									<button
										key={day.id}
										id={day.id}
										type="button"
										onClick={() =>
											handleButtonClicked(day.id)
										}
										className={`h-10 w-full rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-200
											${
												day.isActive
													? 'bg-green-500 text-white'
													: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
											}`}
									>
										{day.label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Workouts Section */}
					{(sundayActive ||
						mondayActive ||
						tuesdayActive ||
						wednesdayActive ||
						thursdayActive ||
						fridayActive ||
						saturdayActive) && (
						<div className="rounded-2xl bg-white p-6 shadow-sm">
							<h2 className="mb-4 text-lg font-medium text-gray-900">
								Workouts
							</h2>
							<button
								type="button"
								onClick={() => void handlePlusButtonClicked()}
								className="mb-4 w-full rounded-xl border-2 border-dashed border-gray-300 bg-white py-4 text-center text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-50"
							>
								{/* <PlusIcon className="mx-auto h-6 w-6" /> */}
								<span className="mt-2 block">Add Workout</span>
							</button>

							{/* Workouts List */}
							{newWorkoutData.length > 0 && (
								<div className="mt-4 space-y-2">
									{newWorkoutData.map((workout) => (
										<div
											key={workout.id}
											className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
										>
											<div className="font-medium text-gray-900">
												{
													exercisesData?.find(
														(exercise) =>
															exercise.id ===
															workout.exerciseId,
													)?.name
												}{' '}
												- {workout.sets} x{' '}
												{workout.reps}
											</div>
											<button
												type="button"
												onClick={() =>
													handleTrashCanClicked(
														workout.id,
													)
												}
												className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
											>
												<TrashCanIcon
													heightValue="5"
													widthValue="5"
													strokeColor="currentColor"
												/>
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Action Buttons */}
					{dataChangeInForm && (
						<div className="flex space-x-4">
							<button
								type="submit"
								disabled={!!errorMessage}
								className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
							>
								Save Session
							</button>
							<button
								type="button"
								onClick={handleCancelClicked}
								className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
							>
								Cancel
							</button>
						</div>
					)}
				</form>
			</div>
		</Layout>
	);
};

export default Session;
