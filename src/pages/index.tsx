import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { type Session } from 'next-auth/core/types';

const Home: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			setIsLoading(false); // if you router.push('/') here, it will cause an infinite loop
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			void router.push('/home');
		}
	}, [status, router]);

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<main className="flex min-h-screen flex-col items-center justify-center bg-white">
					<h1 className="mb-5 text-center text-2xl text-black">
						Gym Tracker
					</h1>
					<AuthDisplay sessionData={sessionData}></AuthDisplay>
				</main>
			</>
		);
	}
};

export default Home;

interface AuthShowcaseProps {
	sessionData: Session | null;
}

const AuthDisplay: React.FC<AuthShowcaseProps> = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4">
				<button
					className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
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
		</>
	);
};
