import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';
import {
	getFirstNameInputElement,
	getLastNameInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const Account: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		// Remove 'Save' & 'Cancel' buttons
		setDataChangeInForm(false);

		// Set the input fields back to their original values
		getFirstNameInputElement(document).value =
			sessionData?.user.firstName ?? 'Loading...';
		getLastNameInputElement(document).value =
			sessionData?.user.lastName ?? 'Loading...';
		getUsernameInputElement(document).value =
			sessionData?.user.username ?? 'Loading...';
	};

	// TODO: Implement this function for saving
	const handleSaveClicked = () => console.log('save was clicked');

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
					<h1 className="text-3xl font-bold pl-2">Settings</h1>
					
					<h2 className="text-2xl font-bold pl-2">Personal Information</h2>
					
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
							<label className="block font-bold">
								First Name
							</label>

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
						<label className="block font-bold">Username</label>
						<input
							id="username"
							className="mt-4 rounded-md bg-gray-300 px-4 py-2 text-white"
							placeholder="Username"
							defaultValue={
								sessionData?.user.username ?? 'Loading...'
							}
							onChange={handleInputChange}
						></input>
					</div>
					{/* <input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Password"
					></input> */}
					{dataChangeInForm ? (
						<div className="mt-4 grid grid-cols-2 gap-1">
							<button
								className="rounded-md bg-green-700 px-4 py-2 text-white"
								onClick={handleSaveClicked}
							>
								Save
							</button>
							<button
								className="rounded-md bg-red-700 px-4 py-2 text-white"
								onClick={handleCancelClicked}
							>
								Cancel
							</button>
						</div>
					) : null}
				</div>
			</>
		);
	}
};

export default Account;
