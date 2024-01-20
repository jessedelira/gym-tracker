import { Workout } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '~/components/layout';

const Workouts: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router]);

	const testWorkoutData: Workout[] = [
		{
			id: '1',
			reps: 10,
			sets: 3,
			weight: 100,
			exerciseId: '1',
			sessionId: '1',
		},
	];

	const workoutData = [
		{
			id: '1',
			name: 'Routine 1',
			description: 'This is the first routine',
		},
	];

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<Layout sessionData={sessionData}>
					<div className="mb-2 grid grid-cols-1">
						<h1 className="pl-2 pt-3 text-2xl font-bold">
							Manage Workouts
						</h1>
					</div>
					<div className="mb-2 flex justify-center">
						<Link href="/create/workout">
							<button className="h-9 w-64 rounded-md bg-lime-300">
								New Workout
							</button>
						</Link>
					</div>
					{workoutData && workoutData.length === 0 ? (
						<h2 className="ml-2">
							You have not created a routine yet, press the blue
							plus button to create one!
						</h2>
					) : (
						<div className="mx-2 rounded-md shadow-md sm:rounded-lg">
							<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
								<thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Routine
										</th>
										<th scope="col" className="px-6 py-3">
											<span className="sr-only">
												Edit
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{workoutData &&
										workoutData.map((routine) => (
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
																?.length > 35
																? routine.description?.substring(
																		0,
																		35,
																  ) + '...'
																: routine.description)}
													</p>
												</th>
												<td className="grid grid-cols-2 px-6 py-4 text-right">
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
				</Layout>
			</>
		);
	}
};

export default Workouts;
