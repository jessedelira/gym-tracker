import { type Routine } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import { api } from '~/utils/api';
import GoldStar from '~/components/goldStar';
import GreyStar from '~/components/greyStar';

const Routines: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
	const router = useRouter();

	const { data: routineData } = api.routine.getRoutines.useQuery({
		userId: sessionData?.user.id || '',
	});
	const { data: activeRoutineData } = api.routine.getActiveRoutine.useQuery({
		userId: sessionData?.user.id || '',
	});
	const setActiveRoutineMutation = api.routine.setActiveRoutine.useMutation();

	const onStarClick = (routineId: string) => {
		setActiveRoutineMutation.mutate({
			routineId: routineId,
		});
		const clickedRoutine = routineData?.find(
			(routine) => routine.id === routineId,
		);
		if (clickedRoutine) {
			setActiveRoutine(clickedRoutine);
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
			// set active routine
			const currentActiveRoutine = activeRoutineData;
			console.log('here');
			if (currentActiveRoutine) {
				console.log('here2');
				setActiveRoutine(currentActiveRoutine);
			}
		}
	}, [status, router, activeRoutineData]);

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<NavBar sessionData={sessionData}></NavBar>
				<div className="mb-2 grid grid-cols-1">
					<h1 className="pl-2 pt-3 text-2xl font-bold">
						Manage Routines
					</h1>
					<div className="flex justify-between ">
						{activeRoutine ? (
							<p className="w-120 text-s w-48 flex-initial pl-2 pt-1">
								Active Routine: {activeRoutine.name}
							</p>
						) : (
							<p className="w-120 pl-2 pt-1 text-xl">
								No Active Routine
							</p>
						)}

						<Link
							href="/create/routine"
							className="mr-2 h-7 w-7 flex-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-7 w-7 rounded-md bg-blue-200"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</Link>
					</div>
				</div>

				{routineData && routineData.length === 0 ? (
					<h2 className="ml-2">
						You have not created a routine yet, press the blue plus
						button to create one!
					</h2>
				) : (
					<div className="mx-2 h-96 overflow-y-auto rounded-md shadow-md sm:rounded-lg">
						<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
							<thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										Routine
									</th>
									<th scope="col" className="px-6 py-3">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{routineData &&
									routineData.map((routine) => (
										<tr
											key={routine.id}
											className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
										>
											<th
												scope="row"
												className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
											>
												{routine.name}
												<p className="text-xs">
													{routine.description &&
														(routine.description
															?.length > 40
															? routine.description?.substring(
																0,
																40,
															) + '...'
															: routine.description)}
												</p>
											</th>

											<td className="grid grid-cols-2 px-6 py-4 text-right">
												{activeRoutine &&
													routine.id ===
													activeRoutine.id ? (
													<button className="font-medium text-yellow-400 hover:underline dark:text-yellow-400">
														<GoldStar />
													</button>
												) : (
													<button
														onClick={() =>
															onStarClick(
																routine.id,
															)
														}
													>
														<GreyStar />
													</button>
												)}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="ml-4 h-6 w-6"
												>
													<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
												</svg>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				)}
			</>
		);
	}
};

export default Routines;
