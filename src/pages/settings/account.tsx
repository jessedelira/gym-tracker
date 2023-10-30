import { type NextPage } from 'next';
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

	const handleSaveClicked = async (e: FormEvent<HTMLFormElement>) => {
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

			await updateUserMutation.mutateAsync(updatedUserData, {
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
		return <div role="status" className='flex w-full h-screen items-center justify-center'>
		<svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
		</svg>
		<span className="sr-only">Loading...</span>
			</div>
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
									Last Name
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
				</div>
			</>
		);
	}
};

export default Account;
