import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';
import RoutineManagerComponent from '~/components/routineManager';

const RoutineManager: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();

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
			<RoutineManagerComponent sessionData={sessionData} />
		</Layout>
	);
};

export default RoutineManager;
