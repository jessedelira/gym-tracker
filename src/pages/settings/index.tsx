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
				<div className="flex items-center">
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

				<div className="ml-4 mr-4 mt-5 rounded-md border-2 border-slate-400 bg-gray-100">
					<div className="flex h-8 border-b-2 border-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
								clipRule="evenodd"
							/>
						</svg>
						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial  pl-3 text-2xl"
						>
							Account
						</Link>
					</div>
					<div className="flex h-8 border-b-2 border-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
								clipRule="evenodd"
							/>
						</svg>
						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial  pl-3 text-2xl"
						>
							Appearance
						</Link>
					</div>
					<div className="flex h-8 border-b-2 border-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
								clipRule="evenodd"
							/>
						</svg>
						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial  pl-3 text-2xl"
						>
							Language
						</Link>
					</div>
					<div className="flex h-8 border-b-2 border-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fill-rule="evenodd"
								d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z"
								clip-rule="evenodd"
							/>
						</svg>

						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial whitespace-nowrap  pl-3 text-2xl"
						>
							Units of Measure
						</Link>
					</div>
					<div className="flex h-8 border-b-2 border-black">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fill-rule="evenodd"
								d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
								clip-rule="evenodd"
							/>
						</svg>

						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial  pl-3 text-2xl"
						>
							Notifications
						</Link>
					</div>
					<div className="flex h-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="ml-0.5 h-9 w-7 flex-none pb-1"
						>
							<path
								fill-rule="evenodd"
								d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							/>
						</svg>

						<Link
							href="/settings/account"
							className="h-9 w-14 flex-initial whitespace-nowrap  pl-3 text-2xl"
						>
							Account Deletion
						</Link>
					</div>
				</div>
			</>
		);
	}
};

export default Settings;
