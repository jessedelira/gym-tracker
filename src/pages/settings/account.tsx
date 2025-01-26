import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';
import { api } from '~/utils/api';
import {
	getFirstNameInputElement,
	getLastNameInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const Account: NextPage = () => {
	const { data: sessionData, status, update } = useSession();
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

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
		await update({});
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
			<div className="flex flex-col">
				<h1 className="pl-2 text-3xl font-bold">Settings</h1>

				<h2 className="pl-2 text-2xl font-bold">
					Personal Information
				</h2>
				<form onSubmit={(e) => void handleSubmit(e)}>
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
									sessionData?.user.firstName ?? 'Loading...'
								}
								onChange={handleInputChange}
							></input>
						</div>

						<div className="mat-4 grid grid-cols-1 gap-1 pr-2">
							<label className="block font-bold">Last Name</label>

							<input
								id="lastName"
								className=" rounded-md bg-gray-300 px-4 py-2 text-white"
								placeholder="Last Name"
								defaultValue={
									sessionData?.user.lastName ?? 'Loading...'
								}
								onChange={handleInputChange}
							></input>
						</div>
					</div>
					<div className="mat-4 grid grid-cols-1">
						<label className="block pl-2 font-bold">Username</label>
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
		</Layout>
	);
};

export default Account;
