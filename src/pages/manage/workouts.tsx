import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';
import { api } from '~/utils/api';

const Workouts: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const { data: allWorkouts } = api.workout.getAllWorkouts.useQuery({
		userId: sessionData?.user.id ?? '',
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
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Manage Workouts
					</h1>
					<p className="mt-2 text-gray-600">
						Create and manage your workout exercises
					</p>
				</div>

				{/* New Workout Button */}
				<div className="mb-6">
					<Link
						href="/create/workout"
						className="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
					>
						Create New Workout
					</Link>
				</div>

				{/* Workouts List */}
				<div className="space-y-4">
					{allWorkouts?.map((workout) => (
						<div
							key={workout.id}
							className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
						>
							<h3 className="text-lg font-medium text-gray-900">
								{workout.exercise.name}
							</h3>
							<div className="mt-2 flex items-center gap-4 text-gray-600">
								<span>{workout.sets} sets</span>
								<span>•</span>
								<span>{workout.reps} reps</span>
								{workout.weightLbs && (
									<>
										<span>•</span>
										<span>{workout.weightLbs} lbs</span>
									</>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{(!allWorkouts || allWorkouts.length === 0) && (
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
							No workouts yet. Create your first workout to get
							started.
						</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Workouts;
