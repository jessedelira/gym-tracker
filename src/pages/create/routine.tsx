import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import { api } from '~/utils/api';
import {
	getFirstNameInputElement,
	getLastNameInputElement,
	getRoutineDescriptionInputElement,
	getRoutineNameInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const Routine: NextPage = () => {
	const { data: sessionData, status, update } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
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

			const newRoutineName = getRoutineNameInputElement(document).value;
			const newRoutineDescription =
				getRoutineDescriptionInputElement(document).value;
			

			const createRoutineData = {
				name: newRoutineName,
				description: newRoutineDescription,
				userId: sessionData.user.id,
			};

			await createRoutineMutation.mutateAsync(createRoutineData, {
				onSuccess: () => {
					setDataChangeInForm(false);
				},
			});
		}
		await changeSession();
	};

	const changeSession = async () => {
		await update({}).then(() => {
			console.log('Session updated');
		});
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
				<NavBar sessionData={sessionData}></NavBar>
				<div className="flex flex-col">
					<h1 className="pl-2 text-3xl font-bold">Create</h1>

					<h2 className="pl-2 text-2xl font-bold">
						Routine Information
					</h2>
					<form onSubmit={(e) => void handleSaveClicked(e)}>
						<div className="mat-4 flex">
							<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
								<label className="block font-bold">
									Routine Name
								</label>
								<input
									id="routineName"
									className=" rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Name"
									onChange={handleInputChange}
								></input>
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
			</>
		);
	}
};

export default Routine;
