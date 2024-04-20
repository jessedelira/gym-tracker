import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import {
	getDaysSelected,
	getSessionDescriptionInputElement,
	getSessionNameInputElement,
} from '~/utils/documentUtils';

const Session: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();

	const createSessionMutation = api.session.createSession.useMutation();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router]);

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const newSessionName = getSessionNameInputElement(document).value;
			const newSessionDescription =
				getSessionDescriptionInputElement(document).value;
			const daysSelected = getDaysSelected(document);

			const createSessionData = {
				name: newSessionName,
				description: newSessionDescription,
				userId: sessionData.user.id,
				days: daysSelected,
			};

			await createSessionMutation.mutateAsync(createSessionData, {
				onSuccess: () => {
					void router.push('/manage/sessions');
				},
			});
		}
	};

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
	};

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<Layout sessionData={sessionData}>
					<div className="flex flex-col">
						<div className="flex flex-row">
							<h1 className="pl-2 text-3xl font-bold">Create</h1>
						</div>
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
										id="sessionName"
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
									id="sessionDescription"
									className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Description"
									onChange={handleInputChange}
									required
								></textarea>
							</div>

							{/* create multi-select of the days of the week checkboxs */}
							<div className="mat-4 grid grid-cols-1">
								<label className="block pl-2 font-bold">
									Day of the Week
								</label>
								<div className="grid grid-cols-3">
									<label className="block pl-2">
										<input
											id="sunday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Sunday
									</label>
									<label className="block pl-2">
										<input
											id="monday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Monday
									</label>
									<label className="block pl-2">
										<input
											id="tuesday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Tuesday
									</label>
									<label className="block pl-2">
										<input
											id="wednesday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Wednesday
									</label>
									<label className="block pl-2">
										<input
											id="thursday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Thursday
									</label>
									<label className="block pl-2">
										<input
											id="friday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Friday
									</label>
									<label className="block pl-2">
										<input
											id="saturday-select"
											type="checkbox"
											className="mr-2"
											onChange={handleInputChange}
										/>
										Saturday
									</label>
								</div>
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
