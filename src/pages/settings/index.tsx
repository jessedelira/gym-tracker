import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMonthDDCommaYYYY } from '~/utils/dateUtils';
import Link from 'next/link';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';

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


		return (
			<Layout>
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
					<Link href="/settings/account">
						<div className="flex h-8 border-b-[0.5px] border-black">
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
							<p className="h-9 w-14 flex-initial  pl-3 text-2xl">
								Account
							</p>
						</div>
					</Link>
					<Link href="/settings/apperance">
						<div className="flex h-8 border-b-[0.5px] border-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="l-0.5 h-9 w-7 flex-none pb-1"
							>
								<path d="M15.993 1.385a1.87 1.87 0 012.623 2.622l-4.03 5.27a12.749 12.749 0 01-4.237 3.562 4.508 4.508 0 00-3.188-3.188 12.75 12.75 0 013.562-4.236l5.27-4.03zM6 11a3 3 0 00-3 3 .5.5 0 01-.72.45.75.75 0 00-1.035.931A4.001 4.001 0 009 14.004V14a3.01 3.01 0 00-1.66-2.685A2.99 2.99 0 006 11z" />
							</svg>

							<p className="h-9 w-14 flex-initial  pl-3 text-2xl">
								Appearance
							</p>
						</div>
					</Link>
					<Link href="/settings/language">
						<div className="flex h-8 border-b-[0.5px] border-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="ml-0.5 h-9 w-7 flex-none pb-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
								/>
							</svg>
							<p className="h-9 w-14 flex-initial  pl-3 text-2xl">
								Language
							</p>
						</div>
					</Link>
					<Link href="measure">
						<div className="flex h-8 border-b-[0.5px] border-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="ml-0.5 h-9 w-7 flex-none pb-1"
							>
								<path
									fillRule="evenodd"
									d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z"
									clipRule="evenodd"
								/>
							</svg>

							<p className="h-9 w-14 flex-initial whitespace-nowrap  pl-3 text-2xl">
								Units of Measure
							</p>
						</div>
					</Link>
					<Link href="/settings/notifications">
						<div className="flex h-8 border-b-[0.5px] border-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="ml-0.5 h-9 w-7 flex-none pb-1"
							>
								<path
									fillRule="evenodd"
									d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
									clipRule="evenodd"
								/>
							</svg>

							<p className="h-9 w-14 flex-initial  pl-3 text-2xl">
								Notifications
							</p>
						</div>
					</Link>
					<Link href="/settings/accountDeletion">
						<div className="flex h-8">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="ml-0.5 h-9 w-7 flex-none pb-1"
							>
								<path
									fillRule="evenodd"
									d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
									clipRule="evenodd"
								/>
							</svg>

							<p className="h-9 w-14 flex-initial whitespace-nowrap  pl-3 text-2xl">
								Account Deletion
							</p>
						</div>
					</Link>
				</div>
			</Layout>
		);
	
};

export default Settings;
