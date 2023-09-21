import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import NavBar from '~/components/navbar';

const Account: NextPage = () => {
	const { data: sessionData, status } = useSession();

	return (
		<>
			<NavBar sessionData={sessionData}></NavBar>
			<h1>Account</h1>
		</>
	);
};

export default Account;
