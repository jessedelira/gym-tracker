import { type Routine } from '@prisma/client';
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

	const mockRoutineData: Routine[] = [
		{
			id: '1',
			name: 'Strength Training',
			description:
				'This is the description for the strength training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '2',
			name: 'Cardio Training',
			description:
				'This is the description for the cardio training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '3',
			name: 'Yoga Training',
			description:
				'This is the description for the yoga training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '4',
			name: 'Meditation Training',
			description:
				'This is the description for the meditation training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '5',
			name: 'Running Training',
			description:
				'This is the description for the running training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '6',
			name: 'Swimming Training',
			description:
				'This is the description for the swimming training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '7',
			name: 'Cycling Training',
			description:
				'This is the description for the cycling training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '8',
			name: 'Hiking Training',
			description:
				'This is the description for the hiking training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: true,
		},
		{
			id: '9',
			name: 'Rock Climbing Training',
			description:
				'This is the description for the rock climbing training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
		{
			id: '10',
			name: 'Weight Lifting Training',
			description:
				'This is the description for the weight lifting training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
		{
			id: '11',
			name: 'Crossfit Training',
			description:
				'This is the description for the crossfit training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
		{
			id: '12',
			name: 'HIIT Training',
			description:
				'This is the description for the HIIT training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
		{
			id: '13',
			name: 'Boxing Training',
			description:
				'This is the description for the boxing training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
		{
			id: '14',
			name: 'Kickboxing Training',
			description:
				'This is the description for the kickboxing training routine',
			shortDescription: 'Prep for the zombie apocalypse',
			userId: '1',
			createdAt: new Date(),
			isActive: false,
		},
	];

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
				<div className="mb-2 grid grid-cols-1">
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
								className="h-6 w-6 rounded-md bg-blue-200 "
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

				{/* <div className="relative mx-2 overflow-x-auto rounded-md shadow-md sm:rounded-lg">
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
							{mockRoutineData.map((routine) => (
								<tr
									key={routine.id}
									className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
									>
										{routine.name}
										<p className="text-xs">
											{routine.shortDescription}
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
							))}
						</tbody>
					</table>
				</div> */}

				<div className="mx-2 h-96 overflow-x-auto overflow-y-auto rounded-md shadow-md sm:rounded-lg">
					<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
						<thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
							{mockRoutineData.map((routine) => (
								<tr
									key={routine.id}
									className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
									>
										{routine.name}
										<p className="text-xs">
											{routine.shortDescription}
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
							))}
						</tbody>
					</table>
				</div>
			</>
		);
	}
};

export default Routines;
