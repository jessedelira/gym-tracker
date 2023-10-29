import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';

const Routines: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const currentRoutine = 'Strength Training';

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
		return (
			<>
				<NavBar sessionData={sessionData}></NavBar>
				<div className="grid grid-cols-1">
					<h1 className="pl-2 pt-3 text-2xl font-bold">
						Manage Routines
					</h1>
					<div className="flex">
						<p className="w-120 pl-2 pt-1 text-xl">
							Current Routine: {currentRoutine}
						</p>
						<Link href="/create/routine" className="ml-10 pt-1.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6 rounded-md bg-slate-300 "
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</Link>
					</div>
				</div>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-2 rounded-md">
					<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
						<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Routine
								</th>
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							
							<tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
								>
									Magic Mouse 2
									<p className="text-xs">
										This is the descriptoin
									</p>
								</th>

								<td className="px-6 py-4 text-right">
									<a
										href="#"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										Edit
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	}
};

export default Routines;
