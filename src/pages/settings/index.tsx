import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import { getMonthDDCommaYYYY } from '~/utils/dateUtils';
import Link from 'next/link';

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
					<div className="mt-4 pl-4">
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
					<div className="ml-4 mt-4 grid grid-cols-1">
						<h1 className="text-2xl">
							{sessionData?.user.firstName}{' '}
							{sessionData?.user.lastName}
						</h1>
						<h2 className="text-l">
							Member since{' '}
							{getMonthDDCommaYYYY(sessionData?.user.dateCreated)}
						</h2>
					</div>
				</div>

				<div className="ml-4 mr-4 rounded-md border-2 mt-5 border-slate-400 bg-gray-100">
					<div className=''>
						<Link
							href="/settings/account"
							className="block border-b-2 border-black text-2xl"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
									clip-rule="evenodd"
								/>
							</svg>
							Account
						</Link>
					</div>
					<Link
						href="/settings/appearance"
						className="block border-b-2 border-black text-2xl"
					>
						Appearance
					</Link>
					<Link
						href="/settings/location"
						className="block border-b-2 border-black text-2xl"
					>
						Location & Language
					</Link>
					<Link
						href="/settings/notifications"
						className="block border-b-2 border-black text-2xl"
					>
						Notifications
					</Link>
					<Link
						href="/settings/delete"
						className="block border-b-2 text-2xl "
					>
						Account Deletion
					</Link>
				</div>
			</>
		);
	}
};

export default Settings;
