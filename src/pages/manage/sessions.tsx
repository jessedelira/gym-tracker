import { type Session } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TrashCanIcon from '~/components/icons/trashCanIcon';
import Layout from '~/components/layout';
import { api } from '~/utils/api';

const Sessions: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [allSessionDataState, setAllSessionDataState] = useState<Session[]>([]);
	const router = useRouter();

	const { data: allSessionData } = api.session.getAllSessions.useQuery({
		userId: sessionData?.user.id || '',
	});
	const deleteSessionMutation = api.session.deleteSession.useMutation();
	

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
		setAllSessionDataState(allSessionData || []);
	}, [status, router, allSessionData]);

	const handleTrashCanClicked= (id: string): void => {
		deleteSessionMutation.mutate({ sessionId: id });
		setAllSessionDataState(
			allSessionDataState.filter((session) => session.id !== id),
		);
	}

	return (
		<Layout>
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
					You have not created a session yet, press the blue plus
					button to create one!
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
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{allSessionDataState &&
								allSessionDataState.map((session) => (
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
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="black"
												className="size-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
												/>
											</svg>

											<button
												className="ml-4 h-6 w-6  rounded-full pl-1"
												onClick={() =>
													void handleTrashCanClicked(session.id)
												}
											>
												<TrashCanIcon
													heightValue={'6'}
													widthValue={'6'}
												></TrashCanIcon>
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</Layout>
	);
};

export default Sessions;