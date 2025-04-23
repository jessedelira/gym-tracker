import { type NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '~/components/Spinner';
import Link from 'next/link';

const Home: NextPage = () => {
	const { status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			setIsLoading(false);
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			void router.push('/home');
		}
	}, [status, router]);

	if (isLoading) return <Spinner />;

	return (
		<main className="landing-page bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center pb-12 pt-24">
					<div className="w-full max-w-md">
						<div className="text-center">
							<h1 className="text-5xl font-semibold tracking-tight text-gray-900">
								Gym Tracker
							</h1>
							<p className="mt-6 text-xl text-gray-600">
								Your fitness journey, simplified.
							</p>
						</div>

						<div className="mt-12 space-y-4">
							<button
								onClick={() => void signIn('credential')}
								className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
							>
								Sign In
							</button>
							<Link
								href="/signup"
								className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
							>
								Create Account
							</Link>
						</div>
					</div>
				</div>

				<div className="">
					<div className="mx-auto max-w-3xl space-y-12">
						<div className="transform-gpu rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
							<div className="mb-6 inline-flex rounded-2xl bg-blue-50 p-4 transition-all group-hover:bg-blue-100">
								<svg
									className="h-8 w-8 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-medium text-gray-900">
								Track Workouts
							</h3>
							<p className="mt-3 text-lg leading-relaxed text-gray-500">
								Log your exercises with a clean, intuitive
								interface.
							</p>
						</div>

						{/* Monitor Progress */}
						<div className="transform-gpu rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
							<div className="mb-6 inline-flex rounded-2xl bg-green-50 p-4 transition-all group-hover:bg-green-100">
								<svg
									className="h-8 w-8 text-green-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-medium text-gray-900">
								Monitor Progress
							</h3>
							<p className="mt-3 text-lg leading-relaxed text-gray-500">
								Visualize your improvement over time.
							</p>
						</div>

						<div className="transform-gpu rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
							<div className="mb-6 inline-flex rounded-2xl bg-purple-50 p-4 transition-all group-hover:bg-purple-100">
								<svg
									className="h-8 w-8 text-purple-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-medium text-gray-900">
								Achieve Goals
							</h3>
							<p className="mt-3 text-lg leading-relaxed text-gray-500">
								Set and reach your fitness targets with
								confidence.
							</p>
						</div>
					</div>
				</div>

				<div className="py-16 text-center">
					<Link
						href="https://github.com/jessedelira/gym-tracker.app"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 rounded-full bg-gray-50 px-6 py-3 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
					>
						<svg
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.885 1.845 1.245 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
							/>
						</svg>
						<span className="text-sm font-medium">
							View on GitHub
						</span>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Home;
