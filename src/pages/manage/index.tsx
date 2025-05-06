import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import ManagePageLink from '~/components/managePageLink';
import Spinner from '~/components/Spinner';

const Manage: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const { data: activeRoutineData } = api.routine.getActiveRoutine.useQuery();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	if (!sessionData) {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="flex h-full flex-col space-y-4 bg-gray-50 p-4">
				{/* Header */}
				<div className="mb-2">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Manage Your Workouts
					</h1>
					<p className="mt-1 text-gray-600">
						Track and organize your fitness journey
					</p>
				</div>

				{/* Active Routine Status */}
				<div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
					<div className="flex items-center space-x-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6 text-blue-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
								/>
							</svg>
						</div>
						<div className="flex flex-col">
							<div className="text-sm font-medium text-gray-500">
								Active Routine
							</div>
							<div className="text-lg font-semibold text-gray-900">
								{activeRoutineData?.name ??
									'No active routine selected'}
							</div>
						</div>
					</div>
				</div>

				{/* Management Options */}
				<div className="rounded-xl border border-gray-100 bg-white shadow-sm">
					<ManagePageLink
						href="/manage/routines"
						title="Manage Routines"
						description="Collection of sessions for your week"
					/>
					<div className="h-[1px] w-full bg-gray-100" />
					<ManagePageLink
						href="/manage/sessions"
						title="Manage Sessions"
						description="Workouts grouped by day"
					/>
				</div>

				{/* Activity Graph */}
				{/* <div className="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold text-gray-900">
						Activity Graph
					</h2>
					<ActivityGraph />
				</div> */}
			</div>
		</Layout>
	);
};

export default Manage;
