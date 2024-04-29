import { type Routine } from '@prisma/client';
import { Session } from 'next-auth';
import React, { useState } from 'react';
import { api } from '~/utils/api';

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

	const allSessions = api.session.getAllSessions.useQuery({
		userId: sessionData?.user.id ?? '',
	});

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		console.log(event.target.checked);
		console.log(event.target.value);
	};

	return (
		<>
			<div className="mt-6">
				<div className="flex justify-center">
					<h1 className="text-2xl">Routine Manager</h1>
				</div>
				<div className="flex justify-center">
					<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
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
					<button className="h-9 w-32 rounded-md bg-lime-300">
						Add
					</button>
				</div>

				<p className="flex justify-center">
					Active Sessions in {activeRoutine?.name}
				</p>
				<div className="flex justify-center">
					<p>Session Name: Arm Day</p>
					<p className="ml-2">X (Remove)</p>
				</div>
				<div className="flex justify-center">
					<p>Session Name: Arm Day</p>
					<p className="ml-2">X (Remove)</p>
				</div>
				<div className="flex justify-center">
					<p>Session Name: Arm Day</p>
					<p className="ml-2">X (Remove)</p>
				</div>

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
