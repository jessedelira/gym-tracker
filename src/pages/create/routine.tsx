import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import {
	getRoutineDescriptionInputElement,
	getRoutineNameInputElement,
} from '~/utils/documentUtils';

const Routine: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();
	const createRoutineMutation = api.routine.createRoutine.useMutation();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		getRoutineNameInputElement(document).value = '';
		getRoutineDescriptionInputElement(document).value = '';
	};

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();
			setErrorMessage(null);

			const newRoutineName = getRoutineNameInputElement(document).value;
			const newRoutineDescription =
				getRoutineDescriptionInputElement(document).value;

			const createRoutineData = {
				name: newRoutineName,
				description: newRoutineDescription,
				userId: sessionData.user.id,
			};

			try {
				await createRoutineMutation.mutateAsync(createRoutineData, {
					onSuccess: () => {
						void router.push('/manage/routines');
					},
				});
			} catch (error) {
				if (error instanceof Error) {
					if (error.message.includes('Unique constraint')) {
						setErrorMessage(
							'A routine with this name already exists',
						);
					} else {
						setErrorMessage(
							'An error occurred while creating the routine',
						);
					}
				}
			}
		}
	};

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
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Create New Routine
					</h1>
					<p className="mt-2 text-gray-600">
						Set up a new workout routine with custom exercises
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={(e) => void handleSaveClicked(e)}
					className="space-y-6"
				>
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						{/* Routine Name */}
						<div className="mb-6">
							<label
								htmlFor="routineName"
								className="mb-2 block text-sm font-medium text-gray-900"
							>
								Routine Name
							</label>
							<input
								id="routineName"
								className={`w-full rounded-xl border-2 ${
									errorMessage
										? 'border-red-500'
										: 'border-gray-200'
								} bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
								placeholder="Enter routine name"
								onChange={handleInputChange}
								required
							/>
							{errorMessage && (
								<p className="mt-2 text-sm text-red-600">
									{errorMessage}
								</p>
							)}
						</div>

						{/* Description */}
						<div>
							<label
								htmlFor="routineDescription"
								className="mb-2 block text-sm font-medium text-gray-900"
							>
								Description
							</label>
							<textarea
								id="routineDescription"
								className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								placeholder="Describe your routine"
								rows={4}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div
						className={`space-y-3 ${!dataChangeInForm && 'hidden'}`}
					>
						<button
							type="submit"
							className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Save Routine
						</button>
						<button
							type="button"
							onClick={handleCancelClicked}
							className="w-full rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
						>
							Cancel
						</button>
					</div>

					{/* Helper Text */}
					{!dataChangeInForm && (
						<div className="text-center text-sm text-gray-500">
							Start typing to create your routine
						</div>
					)}
				</form>
			</div>
		</Layout>
	);
};

export default Routine;
