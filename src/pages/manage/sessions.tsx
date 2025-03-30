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
	const [allSessionDataState, setAllSessionDataState] = useState<Session[]>(
		[],
	);
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

	const handleTrashCanClicked = (id: string): void => {
		deleteSessionMutation.mutate({ sessionId: id });
		setAllSessionDataState(
			allSessionDataState.filter((session) => session.id !== id),
		);
	};

	return (
		<Layout>
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Manage Sessions
					</h1>
					<p className="mt-2 text-gray-600">
						Create and organize your workout sessions
					</p>
				</div>

				{/* New Session Button */}
				<div className="mb-6">
					<Link
						href="/create/session"
						className="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
					>
						Create New Session
					</Link>
				</div>

				{/* Sessions List */}
				{allSessionData && allSessionData.length === 0 ? (
					<div className="mt-8 text-center">
						<div className="mb-4 inline-flex rounded-full bg-blue-100 p-4">
							<svg
								className="h-6 w-6 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</div>
						<p className="text-gray-600">
							No sessions yet. Create your first session to get
							started.
						</p>
					</div>
				) : (
					<div className="space-y-3">
						{allSessionDataState.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
							>
								<div className="flex-1">
									<h3 className="text-lg font-medium text-gray-900">
										{session.name}
									</h3>
									{session.description && (
										<p className="mt-1 text-sm text-gray-600">
											{session.description.length > 100
												? `${session.description.substring(
														0,
														100,
												  )}...`
												: session.description}
										</p>
									)}
								</div>
								<div className="ml-4 flex items-center space-x-3">
									<Link
										href={`/edit/session/${session.id}`}
										className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
										title="Edit session"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-5 w-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
											/>
										</svg>
									</Link>
									<button
										onClick={() =>
											void handleTrashCanClicked(
												session.id,
											)
										}
										className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
										title="Delete session"
									>
										<TrashCanIcon
											strokeColor="currentColor"
											heightValue="5"
											widthValue="5"
										/>
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Sessions;
