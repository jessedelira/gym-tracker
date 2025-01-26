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

	if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<>
				<main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 pb-20">
					<div className="mb-12 text-center">
						<h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
							Gym Tracker
						</h1>
						<p className="mb-8 text-lg text-gray-600">
							Track your workouts. Monitor your progress. Achieve your goals.
						</p>
						<div className="flex flex-col items-center justify-center gap-4">
							<button
								className="group relative mb-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
								onClick={() => void signIn('credential')}
							>
								<span className="relative rounded-md bg-white px-10 py-3.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
									Sign In
								</span>
							</button>
						</div>
						<div className="mt-4 inline-flex items-center text-gray-600">
							<div>Don&apos;t have an account?</div>
							<Link
								href="/signup"
								className="ml-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
							>
								Sign up
							</Link>
						</div>
					</div>

					{/* Features Section */}
					<div className="mb-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-4">
						<div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
							<div className="mb-3 text-black">
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
							</div>
							<h3 className="mb-1 text-base font-semibold">Track Workouts</h3>
							<p className="text-sm text-gray-600">Log your exercises, sets, and reps with ease</p>
						</div>

						<div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
							<div className="mb-3 text-black">
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="mb-1 text-base font-semibold">Monitor Progress</h3>
							<p className="text-sm text-gray-600">View your improvement over time</p>
						</div>

						<div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
							<div className="mb-3 text-black">
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<h3 className="mb-1 text-base font-semibold">Achieve Goals</h3>
							<p className="text-sm text-gray-600">Set and reach your fitness targets</p>
						</div>
					</div>

					{/* Footer Links */}
					<div className="absolute bottom-6 flex gap-6 p-4">
						<Link
							href="https://github.com/jessedelira/gym-tracker.app"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
								/>
							</svg>
						</Link>
					</div>
				</main>
			</>
		);
	}
};

export default Home;
