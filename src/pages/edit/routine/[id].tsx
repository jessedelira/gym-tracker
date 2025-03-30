import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import Spinner from '~/components/Spinner';
import { type Session } from '@prisma/client';
import TrashCanIcon from '~/components/icons/trashCanIcon';
import { Days } from '~/common/days.enum';

interface SessionIncludingDays extends Session {
	days: { day: string }[];
}

const EditRoutine: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const { id } = router.query;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const [sessionsOnRoutine, setSessionsOnRoutine] = useState<
		SessionIncludingDays[]
	>([]);
	const [sessionsNotOnRoutine, setSessionsNotOnRoutine] = useState<Session[]>(
		[],
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Day states for visual feedback
	const [sundayTaken, setSundayTaken] = useState(false);
	const [mondayTaken, setMondayTaken] = useState(false);
	const [tuesdayTaken, setTuesdayTaken] = useState(false);
	const [wednesdayTaken, setWednesdayTaken] = useState(false);
	const [thursdayTaken, setThursdayTaken] = useState(false);
	const [fridayTaken, setFridayTaken] = useState(false);
	const [saturdayTaken, setSaturdayTaken] = useState(false);

	// Queries and Mutations
	const { data: routineDetails, isLoading } =
		api.routine.getRoutineById.useQuery(
			{ routineId: id as string },
			{ enabled: !!id },
		);
	const { data: availableSessions } =
		api.session.getSessionsThatAreNotAddedToRoutine.useQuery(undefined, {
			enabled: !!id,
		});
	const updateRoutineMutation = api.routine.updateRoutine.useMutation();
	const addSessionToRoutineMutation =
		api.routine.addSessionToRoutine.useMutation();
	const removeSessionFromRoutineMutation =
		api.routine.removeSessionFromRoutine.useMutation();

	// Load existing routine data
	useEffect(() => {
		if (routineDetails) {
			setName(routineDetails.name);
			setDescription(routineDetails.description || '');
			setSessionsOnRoutine(routineDetails.sessions);
			updateDayStates(routineDetails.sessions);
		}
	}, [routineDetails]);

	useEffect(() => {
		if (availableSessions) {
			setSessionsNotOnRoutine(availableSessions);
		}
	}, [availableSessions]);

	const updateDayStates = (sessions: SessionIncludingDays[]) => {
		const daysTaken = sessions.flatMap((session) =>
			session.days.map((day) => day.day),
		);
		setSundayTaken(daysTaken.includes(Days.SUNDAY));
		setMondayTaken(daysTaken.includes(Days.MONDAY));
		setTuesdayTaken(daysTaken.includes(Days.TUESDAY));
		setWednesdayTaken(daysTaken.includes(Days.WEDNESDAY));
		setThursdayTaken(daysTaken.includes(Days.THURSDAY));
		setFridayTaken(daysTaken.includes(Days.FRIDAY));
		setSaturdayTaken(daysTaken.includes(Days.SATURDAY));
	};

	const handleAddSession = async (sessionId: string) => {
		if (!id || !sessionId) return;

		try {
			await addSessionToRoutineMutation.mutateAsync({
				routineId: id as string,
				sessionId: sessionId,
			});

			// Update local state
			const addedSession = sessionsNotOnRoutine.find(
				(s) => s.id === sessionId,
			);
			if (addedSession) {
				const updatedSessions = [
					...sessionsOnRoutine,
					addedSession as SessionIncludingDays,
				];
				setSessionsOnRoutine(updatedSessions);
				setSessionsNotOnRoutine(
					sessionsNotOnRoutine.filter((s) => s.id !== sessionId),
				);
				setDataChangeInForm(true);

				// Update day states with the new session included
				updateDayStates(updatedSessions);
			}
		} catch (error) {
			setErrorMessage('Failed to add session');
		}
	};

	const handleRemoveSession = async (sessionId: string) => {
		try {
			await removeSessionFromRoutineMutation.mutateAsync({
				routineId: id as string,
				sessionId: sessionId,
			});

			// Update local state
			const removedSession = sessionsOnRoutine.find(
				(s) => s.id === sessionId,
			);
			if (removedSession) {
				const updatedSessions = sessionsOnRoutine.filter(
					(s) => s.id !== sessionId,
				);
				setSessionsOnRoutine(updatedSessions);
				setSessionsNotOnRoutine([
					...sessionsNotOnRoutine,
					removedSession,
				]);
				setDataChangeInForm(true);

				// Update day states based on remaining sessions
				updateDayStates(updatedSessions);
			}
		} catch (error) {
			setErrorMessage('Failed to remove session');
		}
	};

	const handleSave = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id) return;

		try {
			await updateRoutineMutation.mutateAsync({
				routineId: id as string,
				name,
				description,
			});
			void router.push('/manage/routines');
		} catch (error) {
			setErrorMessage('Failed to update routine');
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
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Edit Routine
					</h1>
					<p className="mt-2 text-gray-600">
						Modify your routine details and manage sessions
					</p>
				</div>

				<form
					onSubmit={(e) => void handleSave(e)}
					className="space-y-6"
				>
					{errorMessage && (
						<div className="rounded-xl border border-red-200 bg-red-50 p-4">
							<p className="text-sm font-medium text-red-800">
								{errorMessage}
							</p>
						</div>
					)}

					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<div className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-900"
								>
									Routine Name*
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										setDataChangeInForm(true);
									}}
									className="mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-900"
								>
									Description (optional)
								</label>
								<textarea
									id="description"
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
										setDataChangeInForm(true);
									}}
									className="mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
									rows={3}
								/>
							</div>
						</div>
					</div>

					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<h2 className="mb-4 text-lg font-medium text-gray-900">
							Manage Sessions
						</h2>

						<div className="mb-6 flex justify-center gap-2">
							{[
								{ label: 'S', taken: sundayTaken },
								{ label: 'M', taken: mondayTaken },
								{ label: 'T', taken: tuesdayTaken },
								{ label: 'W', taken: wednesdayTaken },
								{ label: 'T', taken: thursdayTaken },
								{ label: 'F', taken: fridayTaken },
								{ label: 'S', taken: saturdayTaken },
							].map((day, index) => (
								<div
									key={index}
									className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-200 text-lg font-medium ${
										day.taken
											? 'bg-green-100 text-green-800'
											: 'bg-white text-gray-600'
									}`}
								>
									{day.label}
								</div>
							))}
						</div>

						<div className="mb-6 flex gap-2">
							<select
								id="sessionId"
								className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900"
							>
								<option value="">Select a session</option>
								{sessionsNotOnRoutine.map((session) => (
									<option key={session.id} value={session.id}>
										{session.name}
									</option>
								))}
							</select>
							<button
								type="button"
								onClick={() => {
									const select = document.getElementById(
										'sessionId',
									) as HTMLSelectElement;
									const sessionId = select.value;
									if (sessionId) {
										void handleAddSession(sessionId);
									}
								}}
								className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
							>
								Add Session
							</button>
						</div>

						<div className="space-y-3">
							{sessionsOnRoutine.map((session) => (
								<div
									key={session.id}
									className="rounded-xl border border-gray-200 bg-gray-50 p-4"
								>
									<div className="mb-2 flex items-center justify-between">
										<span className="font-medium text-gray-900">
											{session.name}
										</span>
										<button
											type="button"
											onClick={() =>
												void handleRemoveSession(
													session.id,
												)
											}
											className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-200 hover:text-red-500"
										>
											<TrashCanIcon
												heightValue="5"
												widthValue="5"
												strokeColor="currentColor"
											/>
										</button>
									</div>

									{/* Days display */}
									<div className="flex flex-wrap gap-1.5">
										{session.days.map((day, index) => (
											<div
												key={index}
												className="rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700"
											>
												{day.day.slice(0, 3)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{dataChangeInForm && (
						<div className="flex space-x-4">
							<button
								type="submit"
								className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
							>
								Save Changes
							</button>
							<button
								type="button"
								onClick={() =>
									void router.push('/manage/routines')
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

export default EditRoutine;
