import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import {
	getRoutineDescriptionInputElement,
	getRoutineNameInputElement,
} from '~/utils/documentUtils';
import { api } from '~/utils/api';

const Workout: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();
	const exercises = api.exercise.getAllExercises.useQuery();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		getRoutineNameInputElement(document).value = '';
		getRoutineDescriptionInputElement(document).value = '';
	};

	const handleSaveClicked = (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const newRoutineName = getRoutineNameInputElement(document).value;
			const newRoutineDescription =
				getRoutineDescriptionInputElement(document).value;
		}
	};

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
				<Layout sessionData={sessionData}>
					<div className="flex flex-col">
						<h1 className="pl-2 text-3xl font-bold">Create</h1>

						<h2 className="pl-2 text-2xl font-bold">
							Workout Information
						</h2>
						<form onSubmit={(e) => void handleSaveClicked(e)}>
							<div className="mat-4 flex">
								<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
									{/* Drop down with all of the exercises in the database */}
									<select className="rounded-md bg-gray-300 px-4 py-2 text-white" >
										{
											exercises ? (
												exercises.data?.map((exercise) => (
													<option key={exercise.id} value={exercise.id}>
														{exercise.name}
													</option>
												))
											): null }
									</select>
								</div>
							</div>
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Description
								</label>
								<textarea
									id="routineDescription"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Description"
									onChange={handleInputChange}
									required
								></textarea>
							</div>

							{dataChangeInForm ? (
								<div className="mt-4 grid grid-cols-2 gap-1">
									<button
										className="ml-2 rounded-md bg-green-700 px-4 py-2 text-white"
										type="submit"
									>
										Save
									</button>
									<button
										className="mr-2 rounded-md bg-red-700 px-4 py-2 text-white"
										onClick={handleCancelClicked}
									>
										Cancel
									</button>
								</div>
							) : null}
						</form>
					</div>
				</Layout>
			</>
		);
	}
};

export default Workout;
