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
					<h1 className="text-center text-2xl text-black mb-5">
						Gym Tracker 🏋️
					</h1>
					<AuthShowcase sessionData={sessionData}></AuthShowcase>
				</main>
			</>
		);
	}
};

export default Home;

interface AuthShowcaseProps {
	sessionData: Session | null;
}

const AuthShowcase: React.FC<AuthShowcaseProps> = ({ sessionData }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<button
				className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
				onClick={
					sessionData
						? () => void signOut()
						: () => void signIn('credential')
				}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</button>
			<Link href="/signup">
				<p className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20">
					Sign Up
				</p>
			</Link>
		</div>
	);
};
