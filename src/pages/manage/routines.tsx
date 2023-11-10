import { type Routine } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import NavBar from '~/components/navbar';
import { api } from '~/utils/api';

const Routines: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const currentRoutine = 'Strength Training';
	let routineData: Routine[] = [];
	if (sessionData) {
		const getRoutineQuery = api.routine.getRoutines.useQuery({
			userId: sessionData?.user.id,
		});
		if (getRoutineQuery.status === 'success') {
			routineData = getRoutineQuery.data;
		}
	}

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
				<NavBar sessionData={sessionData}></NavBar>
				<div className="mb-2 grid grid-cols-1">
					<h1 className="pl-2 pt-3 text-2xl font-bold">
						Manage Routines
					</h1>
					<div className="flex">
						<p className="w-120 pl-2 pt-1 text-xl">
							Active Routine: {currentRoutine}
						</p>
						<Link href="/create/routine" className="ml-14 pt-1.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6 rounded-md bg-blue-200 "
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

				<div className="mx-2 h-96 overflow-x-auto overflow-y-auto rounded-md shadow-md sm:rounded-lg">
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
							{routineData.length > 0 ? (
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

										<td className="px-6 py-4 text-right">
											<div className="grid grid-cols-2">
												{routine.isActive ? (
													<a
														href="#"
														className="font-medium text-yellow-400 hover:underline dark:text-yellow-400"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="h-6 w-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
															/>
														</svg>
													</a>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														className="h-6 w-6"
													>
														<path
															fillRule="evenodd"
															d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
															clipRule="evenodd"
														/>
													</svg>
												)}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="ml-4 h-6 w-6"
												>
													<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
												</svg>
											</div>
										</td>
									</tr>
								))
							) : (
								<Spinner />
							)}
						</tbody>
					</table>
				</div>
			</>
		);
	}
};

export default Routines;
