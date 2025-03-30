import { type Routine } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import GoldStar from '~/components/icons/goldStarIcon';
import GreyStar from '~/components/icons/greyStarIcon';
import Layout from '~/components/layout';
import Spinner from '~/components/Spinner';

const Routines: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
	const router = useRouter();

	const { data: routineData } = api.routine.getRoutines.useQuery({
		userId: sessionData?.user.id || '',
	});
	const { data: activeRoutineData } = api.routine.getActiveRoutine.useQuery({
		userId: sessionData?.user.id || '',
	});
	const setActiveRoutineMutation = api.routine.setActiveRoutine.useMutation();
	const removeActiveRoutineMutation =
		api.routine.removeActiveRoutine.useMutation();

	const onStarClick = (routineId: string) => {
		if (activeRoutine && activeRoutine.id === routineId) {
			removeActiveRoutineMutation.mutate({
				userId: sessionData?.user.id || '',
			});
			setActiveRoutine(null);
			return;
		}

		setActiveRoutineMutation.mutate({
			routineId: routineId,
		});
		const clickedRoutine = routineData?.find(
			(routine) => routine.id === routineId,
		);
		if (clickedRoutine) {
			setActiveRoutine(clickedRoutine);
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else {
			const currentActiveRoutine = activeRoutineData;
			if (currentActiveRoutine) {
				setActiveRoutine(currentActiveRoutine);
			}
		}
	}, [status, router, activeRoutineData]);

	if (!sessionData) {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header Section */}
				<div className="mb-6">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
							Manage Routines
						</h1>
						<Link
							href="/create/routine"
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</Link>
					</div>

					{/* Active Routine Status */}
					<div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
						<p className="text-sm font-medium text-gray-500">
							Active Routine
						</p>
						<p className="mt-1 text-lg text-gray-900">
							{activeRoutine
								? activeRoutine.name.length > 30
									? activeRoutine.name.substring(0, 30) +
									  '...'
									: activeRoutine.name
								: 'No active routine selected'}
						</p>
					</div>
				</div>

				{/* Routines List */}
				{!routineData || routineData.length === 0 ? (
					<div className="mt-8 text-center">
						<div className="mb-4 inline-flex rounded-full bg-blue-100 p-4">
							<svg
								className="h-6 w-6 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</div>
						<h2 className="text-gray-600">
							Create your first routine to get started
						</h2>
					</div>
				) : (
					<div className="space-y-3">
						{routineData.map((routine) => (
							<div
								key={routine.id}
								className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-gray-900">
											{routine.name}
										</h3>
										{routine.description && (
											<p className="mt-1 text-sm text-gray-600">
												{routine.description.length > 35
													? routine.description.substring(
															0,
															35,
													  ) + '...'
													: routine.description}
											</p>
										)}
									</div>
									<div className="ml-4 flex items-center gap-3">
										<button
											onClick={() =>
												onStarClick(routine.id)
											}
											className="rounded-lg p-2 transition-all hover:bg-gray-100"
										>
											{activeRoutine &&
											routine.id === activeRoutine.id ? (
												<GoldStar />
											) : (
												<GreyStar />
											)}
										</button>
										<Link
											href={`/edit/routine/${routine.id}`}
											className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-5 w-5"
											>
												<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Routines;
