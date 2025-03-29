import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import ManagePageLink from '~/components/managePageLink';
import ActivityGraph from '~/components/activityGraph';
import Spinner from '~/components/Spinner';

const Manage: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const { data: activeRoutineData } = api.routine.getActiveRoutine.useQuery({
		userId: sessionData?.user.id || '',
	});

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
			{/* Active Routine Status - More compact */}
			<div className="mx-4 mt-4 rounded-lg bg-gray-50 p-3">
				<div className="flex items-center space-x-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6 text-gray-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/>
						</svg>
					</div>
					<div className="flex flex-col">
						<div className="text-xs text-gray-500">
							Active Routine
						</div>
						<div className="text-base font-medium text-gray-900">
							{activeRoutineData?.name ??
								'No active routine selected'}
						</div>
					</div>
				</div>
			</div>

			{/* Management Options - More compact */}
			<div className="mx-4 mt-3 overflow-hidden rounded-lg bg-white shadow-sm">
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

				<div className="h-[1px] w-full bg-gray-100" />

				<ManagePageLink
					href="/routine-manager"
					title="Manage Active Routine"
					description="Configure your current routine"
				/>
			</div>

			{/* Activity Graph - No title, more compact */}
			<div className="mx-4 mt-3 rounded-lg bg-white p-3 shadow-sm">
				<ActivityGraph />
			</div>
		</Layout>
	);
};

export default Manage;
