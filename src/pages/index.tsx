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
				<main className="flex min-h-screen flex-col items-center justify-center bg-white">
					<div className="mb-16">
						<h1 className="mb-10 text-center text-4xl text-black">
							Gym Tracker
						</h1>
						<div className="flex flex-col items-center justify-center gap-4">
							<button
								className="mb-1 rounded-lg bg-primaryButton px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
								onClick={() => void signIn('credential')}
							>
								Sign In
							</button>
						</div>
						<div className="inline-flex">
							<div>Don&apos;t have an account? </div>

							<Link
								href="/signup"
								className="ml-1 cursor-pointer text-blue-500 hover:underline"
							>
								Sign up
							</Link>
						</div>
					</div>
				</main>
			</>
		);
	}
};

export default Home;
