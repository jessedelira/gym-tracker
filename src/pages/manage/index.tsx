import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import ManagePageLink from '~/components/managePageLink';
import ActivityGraph from '~/components/activityGraph';
import Spinner from '~/components/Spinner';

const Manage: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const { data: activeRoutineData } = api.routine.getActiveRoutine.useQuery({
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
		<Layout sessionData={sessionData ? sessionData : null}>
			<Spinner />
		</Layout>;
	} else {
		return (
				<Layout sessionData={sessionData}>
					<div className="flex items-center">
						<div className="mt-4 pl-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-12 w-12"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
								/>
							</svg>
						</div>
						<div className="ml-4 mt-4 grid grid-cols-1">
							<h1 className="text-2xl">Active Routine</h1>
							<h2 className="text-l">
								{activeRoutineData?.name ??
									'No active routine selected'}
							</h2>
						</div>
					</div>
					<div className="mt-3 flex flex-col items-center justify-center">
						<div className="mat-4 mx-2 grid grid-cols-1 gap-2">
							<ManagePageLink
								href="/manage/routines"
								title="Manage Routines"
								description="A routine is a collection of
								sessions that you do in a single
								week."
							/>
							<ManagePageLink
								href="/manage/sessions"
								title="Manage Sessions"
								description="A session is a collection of
								workouts that you do in a single
								day."
							/>
							<ManagePageLink
								href="/manage/workouts"
								title="Manage Workouts"
								description="A workout is a collection of
								exercises that you do in a single
								session."
							/>
							<ManagePageLink
								href="/routine-manager"
								title="Manage Active Routine"
								description="Manage the active routine you are
								currently following."
							/>
						</div>
						<ActivityGraph />
					</div>
					<div className="mt-6"></div>
				</Layout>
		);
	}
};

export default Manage;
