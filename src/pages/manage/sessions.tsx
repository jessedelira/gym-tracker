import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '~/components/layout';
import { api } from '~/utils/api';

const Sessions: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const { data: allSessionData } = api.session.getAllSessions.useQuery({
		userId: sessionData?.user.id || '',
	});

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
				<Layout sessionData={sessionData}>
					<div className="mb-2 grid grid-cols-1">
						<h1 className="pl-2 pt-3 text-2xl font-bold">
							Manage Sessions
						</h1>
					</div>
					<div className="mb-2 flex justify-center">
						<Link href="/create/session">
							<button className="h-9 w-64 rounded-md bg-lime-300">
								New Session
							</button>
						</Link>
					</div>
					{allSessionData && allSessionData.length === 0 ? (
						<h2 className="ml-2">
							You have not created a session yet, press the blue
							plus button to create one!
						</h2>
					) : (
						<div className="mx-2 rounded-md shadow-md sm:rounded-lg">
							<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
								<thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Session
										</th>
										<th scope="col" className="px-6 py-3">
											<span className="sr-only">
												Edit
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{allSessionData &&
										allSessionData.map((session) => (
											<tr
												key={session.id}
												className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
											>
												<th
													scope="row"
													className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
												>
													{session.name}
													<p className="text-xs">
														{session.description &&
															(session.description
																?.length > 35
																? session.description?.substring(
																		0,
																		35,
																  ) + '...'
																: session.description)}
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

export default Sessions;
