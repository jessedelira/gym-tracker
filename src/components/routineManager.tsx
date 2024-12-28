import { type Session } from '@prisma/client';
import { type Session as AuthSession } from 'next-auth'; // duplicate identifiers for interface
import React, { type FormEvent, useState, useEffect } from 'react';
import { api } from '~/utils/api';
import { getSessionIdInputElement } from '~/utils/documentUtils';
import MiniTrashCanIcon from './icons/miniTrashCanIcon';
import { Days } from '~/common/days.enum';

interface RoutineManagerProps {
	sessionData: AuthSession | null;
}

interface SessionIncludingDays extends Session {
	days: { day: string }[];
}

const RoutineManagerComponent: React.FC<RoutineManagerProps> = ({
	sessionData,
}) => {
	const [sessionsOnAR, setSessionsOnAR] = useState<SessionIncludingDays[]>(
		[],
	);
	const [sessionsNotOnAR, setSessionsNotOnAR] = useState<Session[]>([]);
	const [sundayTaken, setSundayTaken] = useState(false);
	const [mondayTaken, setMondayTaken] = useState(false);
	const [tuesdayTaken, setTuesdayTaken] = useState(false);
	const [wednesdayTaken, setWednesdayTaken] = useState(false);
	const [thursdayTaken, setThursdayTaken] = useState(false);
	const [fridayTaken, setFridayTaken] = useState(false);
	const [saturdayTaken, setSaturdayTaken] = useState(false);

	const DAY_TAKEN_STYLE = 'bg-lime-500/90';
	const DAY_NOT_TAKEN_STYLE = 'bg-white';

	const { data: sessionsNotOnActiveRoutine } =
		api.session.getSessionsThatAreNotAddedToActiveRoutine.useQuery({
			userId: sessionData?.user.id ?? '',
		});
	const { data: sessionsOnActiveRoutine } =
		api.session.getSessionsAddedToCurrentActiveRoutine.useQuery({
			userId: sessionData?.user.id ?? '',
		});
	const addSessionToActiveRoutineMutation =
		api.routine.addSessionToActiveRoutine.useMutation();
	const removeSessionFromActiveRoutineMutation =
		api.routine.removeSessionFromActiveRoutine.useMutation();

	const handleAddButtonClicked = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (sessionData) {
			const sessionId = getSessionIdInputElement(document).value;

			const routineData =
				await addSessionToActiveRoutineMutation.mutateAsync({
					userId: sessionData.user.id,
					sessionId: sessionId,
				});

			if (routineData) {
				setSessionsOnAR([...routineData.sessions]);
				const daysTakenOnSessionsOnActiveRoutine =
					routineData.sessions.flatMap((session) =>
						session.days.map((day) => day.day),
					);
				setSundayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.SUNDAY),
				);
				setMondayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.MONDAY),
				);
				setTuesdayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.TUESDAY),
				);
				setWednesdayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.WEDNESDAY),
				);
				setThursdayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.THURSDAY),
				);
				setFridayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.FRIDAY),
				);
				setSaturdayTaken(
					daysTakenOnSessionsOnActiveRoutine.includes(Days.SATURDAY),
				);
			}
			const sessionToRemove = sessionsNotOnAR.find(
				(session) => session.id === sessionId,
			);
			if (sessionToRemove) {
				setSessionsNotOnAR(
					sessionsNotOnAR.filter(
						(session) => session.id !== sessionToRemove.id,
					),
				);
			}
		}
	};

	const handleTrashCanClicked = (id: string) => {
		removeSessionFromActiveRoutineMutation.mutate({
			userId: sessionData?.user.id ?? '',
			sessionId: id,
		});
		const remainingDaysOnSessionsOnAR = sessionsOnAR
			.filter((session) => session.id !== id)
			.flatMap((session) => session.days.map((day) => day.day));
		const sessionToAddToDropdown = sessionsOnAR.find(
			(session) => session.id === id,
		);

		if (sessionToAddToDropdown) {
			const daysOfSessionToBeAddedToDropdown =
				sessionToAddToDropdown?.days.map((day) => day.day);

			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.SUNDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.SUNDAY)
			) {
				setSundayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.MONDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.MONDAY)
			) {
				setMondayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.TUESDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.TUESDAY)
			) {
				setTuesdayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.WEDNESDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.WEDNESDAY)
			) {
				setWednesdayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.THURSDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.THURSDAY)
			) {
				setThursdayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.FRIDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.FRIDAY)
			) {
				setFridayTaken(false);
			}
			if (
				daysOfSessionToBeAddedToDropdown.includes(Days.SATURDAY) &&
				!remainingDaysOnSessionsOnAR.includes(Days.SATURDAY)
			) {
				setSaturdayTaken(false);
			}

			setSessionsNotOnAR(sessionsNotOnAR.concat(sessionToAddToDropdown));
		}
		setSessionsOnAR(sessionsOnAR.filter((session) => session.id !== id));
	};

	useEffect(() => {
		if (sessionsOnActiveRoutine) {
			setSessionsOnAR(sessionsOnActiveRoutine);
			const daysTakenOnSessionsOnActiveRoutine =
				sessionsOnActiveRoutine.flatMap((session) =>
					session.days.map((day) => day.day),
				);

			setSundayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.SUNDAY),
			);
			setMondayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.MONDAY),
			);
			setTuesdayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.TUESDAY),
			);
			setWednesdayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.WEDNESDAY),
			);
			setThursdayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.THURSDAY),
			);
			setFridayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.FRIDAY),
			);
			setSaturdayTaken(
				daysTakenOnSessionsOnActiveRoutine.includes(Days.SATURDAY),
			);
		}
		if (sessionsNotOnActiveRoutine) {
			setSessionsNotOnAR(sessionsNotOnActiveRoutine);
		}
	}, [sessionsNotOnActiveRoutine, sessionsOnActiveRoutine]);

	return (
		<>
			<div className="mt-6">
				<div className="flex justify-center">
					<h1 className="text-2xl">Active Routine Manager</h1>
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
							{sessionsNotOnAR
								? sessionsNotOnAR.map((session) => (
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
					<button
						className="h-9 w-32 rounded-md bg-lime-300"
						onClick={() => handleAddButtonClicked}
					>
						Add
					</button>
				</form>

				<div className="mt-2 flex justify-center gap-1">
					{sundayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							S
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							S
						</div>
					)}
					{mondayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							M
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							M
						</div>
					)}
					{tuesdayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							T
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							T
						</div>
					)}
					{wednesdayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							W
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							W
						</div>
					)}
					{thursdayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							T
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							T
						</div>
					)}
					{fridayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							F
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							F
						</div>
					)}
					{saturdayTaken ? (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_TAKEN_STYLE} text-2xl`}
						>
							S
						</div>
					) : (
						<div
							className={`flex h-10 w-10 justify-center border-2 border-black ${DAY_NOT_TAKEN_STYLE} text-2xl`}
						>
							S
						</div>
					)}
				</div>

				<p className="flex justify-center">Active Sessions</p>
				{sessionsOnAR?.map(
					(session) => (
						<div
							key={session.id}
							className="flex-col-2 mb-2 flex justify-center "
						>
							<div className="justify-left flex w-40">
								<p>Session: {session.name}</p>
							</div>
							<div className="justify-right flex">
								<button
									className="ml-4 h-6 w-6  rounded-full bg-red-300 pl-1"
									onClick={() =>
										void handleTrashCanClicked(
											session.id,
										)
									}
								>
									<MiniTrashCanIcon></MiniTrashCanIcon>
								</button>
							</div>
						</div>
					),
				)}
			</div>
		</>
	);
};

export default RoutineManagerComponent;
