import { type NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import { api } from '~/utils/api';
import {
	getFirstNameInputElement,
	getLastNameInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const Account: NextPage = () => {
	const { data: sessionData, status, update } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();
	const updateUserMutation = api.user.updateUser.useMutation();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		getFirstNameInputElement(document).value =
			sessionData?.user.firstName ?? 'Loading...';
		getLastNameInputElement(document).value =
			sessionData?.user.lastName ?? 'Loading...';
		getUsernameInputElement(document).value =
			sessionData?.user.username ?? 'Loading...';
	};

	const handleSaveClicked = (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			e.preventDefault();

			const newUsername = getUsernameInputElement(document).value;
			const newFirstName = getFirstNameInputElement(document).value;
			const newLastName = getLastNameInputElement(document).value;

			const updatedUserData = {
				id: sessionData.user.id,
				newUsername: newUsername,
				newFirstName: newFirstName,
				newLastName: newLastName,
			};

			updateUserMutation.mutate(updatedUserData, {
				onSuccess: () => {
					setDataChangeInForm(false);
				},
			});
		}
	};

	const logSession = () => {
		console.log(sessionData);
	};

	const changeSession = async () => {
		// if(sessionData?.user === undefined) {
		// 	return;
		// }
		// else {
		// 	sessionData.user.firstName = "New First Name";
		// }
		await update({ teeth: 'hi bye GUY' }).then(() => {
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
					<h1 className="pl-2 text-3xl font-bold">Settings</h1>

					<h2 className="pl-2 text-2xl font-bold">
						Personal Information
					</h2>
					<form onSubmit={(e) => void handleSaveClicked(e)}>
						<div className="mat-4 grid grid-cols-2 gap-5 ">
							<div className="mat-4 grid grid-cols-1 pl-2">
								<label className="block font-bold">
									First Name
								</label>
								<input
									id="firstName"
									className=" rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="First Name"
									defaultValue={
										sessionData?.user.firstName ??
										'Loading...'
									}
									onChange={handleInputChange}
								></input>
							</div>

							<div className="mat-4 grid grid-cols-1 gap-1 pr-2">
								<label className="block font-bold">
									First Name
								</label>

								<input
									id="lastName"
									className=" rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Last Name"
									defaultValue={
										sessionData?.user.lastName ??
										'Loading...'
									}
									onChange={handleInputChange}
								></input>
							</div>
						</div>
						<div className="mat-4 grid grid-cols-1">
							<label className="block pl-2 font-bold">
								Username
							</label>
							<input
								id="username"
								className="mx-2 rounded-md bg-gray-300 px-4 py-2 text-white"
								placeholder="Username"
								defaultValue={
									sessionData?.user.username ?? 'Loading...'
								}
								onChange={handleInputChange}
							></input>
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

					<button
						onClick={logSession}
						className="ml-2 mt-4 rounded-md bg-red-700 px-4 py-2 text-white"
					>
						Log Session
					</button>
					<button
						// TODO: Address this issue with TypesScript
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={changeSession}
						className="ml-2 mt-4 rounded-md bg-red-700 px-4 py-2 text-white"
					>
						Update Session
					</button>
				</div>
			</>
		);
	}
};

export default Account;
