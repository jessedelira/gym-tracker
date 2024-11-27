import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '~/components/Spinner';
import WorkoutSessionDisplay from '~/components/workoutSessionDisplay';
import Layout from '~/components/layout';
import ScrollUpRefresh from '~/components/scrollUpToRefresh';

const Home: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	const currentDate = new Date();

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
			<div className="flex h-full flex-col items-center bg-white">
					<WorkoutSessionDisplay
					user={sessionData.user}
					currentDate={currentDate}
				></WorkoutSessionDisplay>
			</div>
		</Layout>
	);
};

export default Home;
