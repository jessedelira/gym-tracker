import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import Account from './account';
import { getMonthDDCommaYYYY, getYYYY } from '~/utils/dateUtils';

const Settings: NextPage = () => {
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
	}, [status, router, sessionData?.user]);

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<NavBar sessionData={sessionData}></NavBar>
				{/* name and 'member since xyx' */}

				<div className="flex items-center ">

					<div className='pl-4 mt-4'>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-12 w-12"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
					</div>
					<div className="ml-4 grid grid-cols-1 mt-4">
						<h1 className='text-2xl'>
							{sessionData?.user.firstName} {sessionData?.user.lastName}
						</h1>
						<h2 className='text-l'>Member since {getMonthDDCommaYYYY(sessionData?.user.dateCreated)}</h2>
					</div>
				</div>

				{/* Account */}
				{/* Appearance */}
				{/* Location & Language */}
				{/* Notifications */}
				{/* Account Deletion RED*/}
			</>
		);
	}
};

export default Settings;
