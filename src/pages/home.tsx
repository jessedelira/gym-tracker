import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import CurrentWorkoutDisplay from '~/components/currentWorkoutDisplay';
import Layout from '~/components/layout';

const Home: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

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
		return <Spinner />;
	} else {
		return (
			<Layout sessionData={sessionData ? sessionData : null}>
				<div className="flex flex-col items-center justify-center">
					<p>Welcome, {sessionData?.user?.firstName}</p>

					<CurrentWorkoutDisplay></CurrentWorkoutDisplay>
				</div>
			</Layout>
		);
	}
};

export default Home;
