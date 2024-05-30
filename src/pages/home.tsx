import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '~/components/Spinner';
import CurrentWorkoutDisplay from '~/components/currentWorkoutDisplay';
import Layout from '~/components/layout';

const Home: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	if(!sessionData) {
		return <Spinner/>;
	}

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center">
				<CurrentWorkoutDisplay></CurrentWorkoutDisplay>
			</div>
		</Layout>
	);
};

export default Home;
