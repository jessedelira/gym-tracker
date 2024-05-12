import { type Routine } from '@prisma/client';
import { type Session } from 'next-auth';
import React, { type FormEvent, useState } from 'react';
import { api } from '~/utils/api';
import { getSessionIdInputElement } from '~/utils/documentUtils';

interface RoutineManagerProps {
	activeRoutine: Routine | null | undefined;
	sessionData: Session | null;
}

const RoutineManager: React.FC<RoutineManagerProps> = ({
	activeRoutine,
	sessionData,
}) => {
	const [mondayHasSession, setMondayHasSession] = useState(false);
	const [tuesdayHasSession, setTuesdayHasSession] = useState(false);

	const sessionsNotOnActiveRoutine =
		api.session.getSessionsThatAreNotAddedToActiveRoutine.useQuery({
			userId: sessionData?.user.id ?? '',
		});
	const addSessionToActiveRoutineMutation =
		api.routine.addSessionToActiveRoutine.useMutation();
	const sessionsOnActiveRoutine =
		api.session.getSessionsAddedToCurrentActiveRoutine.useQuery({
			userId: sessionData?.user.id ?? '',
		});

	const handleAddButtonClicked = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (sessionData) {
			const sessionId = getSessionIdInputElement(document).value;

			await addSessionToActiveRoutineMutation.mutateAsync({
				userId: sessionData.user.id,
				sessionId: sessionId,
			});
		}
	};

	return (
		<>
			<div className="mt-6">
				<div className="flex justify-center">
					<h1 className="text-2xl">Routine Manager</h1>
				</div>
				<form
					onSubmit={(e) => void handleAddButtonClicked(e)}
					className="flex justify-center"
				>
					<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
						<select
							id="sessionId"
							required
							className="rounded-md bg-gray-300 px-4 py-2 text-white"
						>
							{sessionsNotOnActiveRoutine
								? sessionsNotOnActiveRoutine.data?.map(
										(session) => (
											<option
												key={session.id}
												value={session.id}
											>
												{session.name}
											</option>
										),
								  )
								: null}
						</select>
					</div>
					<button
						className="h-9 w-32 rounded-md bg-lime-300"
						onClick={() => handleAddButtonClicked}
					>
						Add
					</button>
				</form>

				<p className="flex justify-center">
					Active Sessions in {activeRoutine?.name}
				</p>
				{sessionsOnActiveRoutine?.data?.map(
					(session) =>
						(
							<div
								key={session.id}
								className="flex justify-center"
							>
								<p>Session Name: {session.name}</p>
								<p className="ml-2">X (Remove)</p>
							</div>
						) ?? null,
				)}

				{/* The blocks to represent the days of the week */}
				<div className="mt-2 flex justify-center gap-1">
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-lime-500/90 text-2xl">
						S
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-white text-2xl">
						M
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-white text-2xl">
						T
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-lime-500/90 text-2xl">
						W
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-white text-2xl">
						T
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-lime-500/90 text-2xl">
						F
					</div>
					<div className="flex h-10 w-10 justify-center border-2 border-black bg-white text-2xl">
						S
					</div>
				</div>
			</div>
		</>
	);
};

export default RoutineManager;
