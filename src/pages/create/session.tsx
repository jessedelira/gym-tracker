import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';

const Session: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router]);

	const handleSaveClicked = (e: FormEvent<HTMLFormElement>) => {
		console.log(e);
		e.preventDefault();
	}

	const handleInputChange = () => {
		setDataChangeInForm(true)
	}

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
	}

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<Layout sessionData={sessionData}>
					<div className="flex flex-col">
						<h1 className="pl-2 text-3xl font-bold">Create</h1>

						<h2 className="pl-2 text-2xl font-bold">
							Session Information
						</h2>
						<form onSubmit={(e) => void handleSaveClicked(e)}>
							<div className="mat-4 flex">
								<div className="mat-4 w-18 mr-2 grid grid-cols-1 pl-2">
									<label className="block font-bold">
										Session Name
									</label>
									<input
										id="routineName"
										className=" rounded-md bg-gray-300 px-4 py-2 text-white"
										placeholder="Name"
										onChange={handleInputChange}
										required
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

export default Session;
