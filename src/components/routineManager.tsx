import { type Routine } from '@prisma/client';
import React, { useState } from 'react';

interface RoutineManagerProps {
	activeRoutine: Routine | null | undefined;
}

const RoutineManager: React.FC<RoutineManagerProps> = ({ activeRoutine }) => {
	const [mondayHasSession, setMondayHasSession] = useState(false);
	const [tuesdayHasSession, setTuesdayHasSession] = useState(false);
	// const [mondayHasSession, setMondayHasSession] = useState(false)
	// const [mondayHasSession, setMondayHasSession] = useState(false)
	// const [mondayHasSession, setMondayHasSession] = useState(false)

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
					<button className="h-9 w-64 rounded-md bg-lime-300">
						Add Session to Active Routine
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
					<div className="flex h-8 w-8 justify-center border-2 border-amber-950 bg-lime-500/90">
						S
					</div>
					<div className="flex h-8 w-8 justify-center border-2 border-amber-950 bg-red-500/90">
						M
					</div>
					<div className="bg-white-500/90 flex h-8 w-8 justify-center border-2 border-amber-950">
						T
					</div>
					<div className="flex h-8 w-8 justify-center border-2 border-amber-950 bg-lime-500/90">
						W
					</div>
					<div className="bg-white-500/90 flex h-8 w-8 justify-center border-2 border-amber-950">
						T
					</div>
					<div className="flex h-8 w-8 justify-center border-2 border-amber-950 bg-lime-500/90">
						F
					</div>
					<div className="flex h-8 w-8 justify-center border-2 border-amber-950 bg-red-500/90">
						S
					</div>
				</div>
			</div>
		</>
	);
};

export default RoutineManager;
