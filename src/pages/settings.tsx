import { User } from '@prisma/client';
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

const Settings: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [userDto, setUserDto] = useState<User>();
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
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Settings</h1>
					<h2 className="text-1xl font-bold">Personal Information</h2>
					<div className="mat-4 grid grid-cols-2 gap-1">
						<div className="mat-4 grid grid-cols-1 gap-1">
							<label className="block font-bold">
								First Name
							</label>
							<input
								id="firstName"
								className="mt-1 rounded-md bg-black px-4 py-2 text-white"
								placeholder="First Name"
								defaultValue={
									sessionData?.user.firstName ?? 'Loading...'
								}
								onChange={handleInputChange}
							></input>
						</div>

						<div className="mat-4 grid grid-cols-1 gap-1">
							<label className="block font-bold">
								First Name
							</label>

							<input
								id="lastName"
								className="mt-1 rounded-md bg-black px-4 py-2 text-white"
								placeholder="Last Name"
								defaultValue={
									sessionData?.user.lastName ?? 'Loading...'
								}
								onChange={handleInputChange}
							></input>
						</div>
					</div>
					<input
						id="username"
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Username"
						defaultValue={
							sessionData?.user.username ?? 'Loading...'
						}
						onChange={handleInputChange}
					></input>
					{/* <input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Password"
					></input> */}
					{dataChangeInForm ? (
						<div className="mt-4 grid grid-cols-2 gap-1">
							<button className="rounded-md bg-black px-4 py-2 text-white">
								Save
							</button>
							<button
								className="rounded-md bg-black px-4 py-2 text-white"
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

export default Settings;
