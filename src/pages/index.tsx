import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthDisplay from '~/components/authDisplay';

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
		return (<></>);
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
