import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import Spinner from '~/components/Spinner';
import CreateWorkoutModal from '~/components/createWorkoutModal';
import TrashCanIcon from '~/components/icons/trashCanIcon';

interface CreateWorkoutData {
	exerciseId: string;
	weightLbs?: number;
	reps?: number;
	sets?: number;
	durationSeconds?: number;
	id: number;
}

const EditSession: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const { id } = router.query;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
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

	// Queries and Mutations
	const { data: sessionDetails, isLoading } =
		api.session.getSessionById.useQuery(
			{ sessionId: id as string },
			{ enabled: !!id },
		);
	const { data: exercisesData } = api.exercise.getAllExercises.useQuery();
	const updateSessionMutation = api.session.updateSession.useMutation();

	// Load existing session data
	useEffect(() => {
		if (sessionDetails) {
			setName(sessionDetails.name);
			setDescription(sessionDetails.description || '');

			// Reset all days to false first
			setSundayActive(false);
			setMondayActive(false);
			setTuesdayActive(false);
			setWednesdayActive(false);
			setThursdayActive(false);
			setFridayActive(false);
			setSaturdayActive(false);

			// Then set only the active days
			sessionDetails.days.forEach((day) => {
				switch (day.day.toLowerCase()) {
					case 'sunday':
						setSundayActive(true);
						break;
					case 'monday':
						setMondayActive(true);
						break;
					case 'tuesday':
						setTuesdayActive(true);
						break;
					case 'wednesday':
						setWednesdayActive(true);
						break;
					case 'thursday':
						setThursdayActive(true);
						break;
					case 'friday':
						setFridayActive(true);
						break;
					case 'saturday':
						setSaturdayActive(true);
						break;
				}
			});

			// Set workouts
			if (sessionDetails.workouts) {
				setNewWorkoutData(
					sessionDetails.workouts.map((workout, index) => ({
						id: index + 1,
						exerciseId: workout.exerciseId,
						weightLbs: workout.weightLbs || undefined,
						reps: workout.reps || undefined,
						sets: workout.sets || undefined,
						durationSeconds: workout.durationSeconds || undefined,
					})),
				);
				setWorkoutId(sessionDetails.workouts.length + 1);
			}
		}
	}, [sessionDetails]);

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (!sessionData || !id) return;

		e.preventDefault();
		setErrorMessage(null);

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

		if (hasSelectedDay && newWorkoutData.length === 0) {
			setErrorMessage('Please add at least one workout to your session');
			return;
		}

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

		try {
			await updateSessionMutation.mutateAsync(
				{
					sessionId: id as string,
					name,
					description,
					days: activeDays,
					workouts: newWorkoutData,
				},
				{
					onSuccess: () => {
						void router.push('/manage/sessions');
					},
				},
			);
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	if (status === 'unauthenticated') {
		void router.push('/');
		return null;
	}

	if (!sessionData || isLoading) {
		return <Spinner />;
	}

	return (
		<Layout>
			{showModal && (
				<CreateWorkoutModal
					onXClick={() => setShowModal(false)}
					onSaveClick={(workoutData) => {
						setNewWorkoutData([
							...newWorkoutData,
							{ ...workoutData, id: workoutId },
						]);
						setWorkoutId(workoutId + 1);
						setShowModal(false);
						setDataChangeInForm(true);
					}}
					exercises={exercisesData ?? []}
				/>
			)}
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Edit Session
					</h1>
					<p className="mt-2 text-gray-600">
						Modify your workout session details
					</p>
				</div>

				<form
					onSubmit={(e) => void handleSaveClicked(e)}
					className="space-y-6"
				>
					{/* Error Message */}
					{errorMessage && (
						<div className="rounded-xl border border-red-200 bg-red-50 p-4">
							<h3 className="text-sm font-medium text-red-800">
								{errorMessage}
							</h3>
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
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setDataChangeInForm(true);
								}}
								className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
									setDataChangeInForm(true);
								}}
								className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								rows={3}
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
										state: sundayActive,
										setState: setSundayActive,
									},
									{
										id: 'monday',
										label: 'M',
										state: mondayActive,
										setState: setMondayActive,
									},
									{
										id: 'tuesday',
										label: 'T',
										state: tuesdayActive,
										setState: setTuesdayActive,
									},
									{
										id: 'wednesday',
										label: 'W',
										state: wednesdayActive,
										setState: setWednesdayActive,
									},
									{
										id: 'thursday',
										label: 'T',
										state: thursdayActive,
										setState: setThursdayActive,
									},
									{
										id: 'friday',
										label: 'F',
										state: fridayActive,
										setState: setFridayActive,
									},
									{
										id: 'saturday',
										label: 'S',
										state: saturdayActive,
										setState: setSaturdayActive,
									},
								].map((day) => (
									<button
										key={day.id}
										type="button"
										onClick={() => {
											day.setState(!day.state);
											setDataChangeInForm(true);
										}}
										className={`h-10 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-200
                                            ${
												day.state
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
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<h2 className="mb-4 text-lg font-medium text-gray-900">
							Workouts
						</h2>
						<button
							type="button"
							onClick={() => setShowModal(true)}
							className="mb-4 w-full rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-50"
						>
							<span className="block">Add Workout</span>
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
											{workout.durationSeconds
												? `- ${Math.floor(
														workout.durationSeconds /
															60,
												  )} minutes`
												: `- ${workout.sets} x ${workout.reps}`}
										</div>
										<button
											type="button"
											onClick={() => {
												setNewWorkoutData(
													newWorkoutData.filter(
														(w) =>
															w.id !== workout.id,
													),
												);
												setDataChangeInForm(true);
											}}
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

					{/* Action Buttons */}
					{dataChangeInForm && (
						<div className="!mb-2 flex space-x-4">
							<button
								type="submit"
								disabled={!!errorMessage}
								className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
							>
								Save Changes
							</button>
							<button
								type="button"
								onClick={() =>
									void router.push('/manage/sessions')
								}
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

export default EditSession;
