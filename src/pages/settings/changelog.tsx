import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '~/components/layout';
import Spinner from '~/components/Spinner';
import { api } from '~/utils/api';

const Changelog: NextPage = () => {
	const { data: sessionData, status, update } = useSession();
	const router = useRouter();
	const [hasUpdated, setHasUpdated] = useState(false);

	const updateHasSeenLatestChangelogMutation =
		api.user.updateHasSeenLatestChangelog.useMutation();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		if (
			sessionData?.user &&
			!sessionData.user.hasSeenLatestChangelog &&
			!hasUpdated
		) {
			setHasUpdated(true);
			void updateHasSeenLatestChangelogMutation
				.mutateAsync({
					userId: sessionData.user.id,
				})
				.then(() => {
					void update();
				});
		}
	}, [
		sessionData?.user,
		updateHasSeenLatestChangelogMutation,
		update,
		hasUpdated,
	]);

	if (!sessionData) {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Changelog
					</h1>
					<p className="mt-2 text-gray-600">
						Recent updates and improvements to Gym Tracker
					</p>
				</div>

				{/* Changelog Content */}
				<div className="space-y-6">
					{/* Version 1.0.0 */}
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-medium text-gray-900">
								Version 1.0.0
							</h2>
							<span className="text-sm text-gray-500">
								March 2024
							</span>
						</div>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										Initial Release
									</h3>
									<p className="mt-1 text-sm text-gray-600">
										Welcome to Gym Tracker! Track your
										workouts, create routines, and monitor
										your progress.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										Core Features
									</h3>
									<p className="mt-1 text-sm text-gray-600">
										• Workout tracking with sets, reps, and
										weights
										<br />
										• Custom routine creation
										<br />
										• Progress monitoring
										<br />• User preferences and settings
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Version 0.9.0 */}
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-medium text-gray-900">
								Version 0.9.0
							</h2>
							<span className="text-sm text-gray-500">
								February 2024
							</span>
						</div>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										Beta Release
									</h3>
									<p className="mt-1 text-sm text-gray-600">
										Initial beta release with core
										functionality for testing and feedback.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Changelog;
