import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '~/components/layout';

const Sessions: NextPage = () => {
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
		return <></>;
	} else {
		<>
			<Layout sessionData={sessionData}>
				<div className="mb-2 grid grid-cols-1">
					<h1 className="pl-2 pt-3 text-2xl font-bold">
						Manage Sessions
					</h1>
				</div>
				<div className="mb-2 grid grid-cols-1">
					<h2 className="pl-2 pt-3 text-xl font-bold">
						Active Session
					</h2>
				</div>
				<div className="mb-2 grid grid-cols-1">
					<h2 className="pl-2 pt-3 text-xl font-bold">
						Past Sessions
					</h2>
				</div>
			</Layout>
		</>;
	}
};

export default Sessions;