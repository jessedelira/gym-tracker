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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();
	const updateUserMutation = api.user.updateUser.useMutation();

	const handleInputChange = () => {
		setDataChangeInForm(true);
	};

	const handleCancelClicked = () => {
		setDataChangeInForm(false);
		setErrorMessage(null);
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
			setErrorMessage(null);

			const newUsername = getUsernameInputElement(document).value;
			const newFirstName = getFirstNameInputElement(document).value;
			const newLastName = getLastNameInputElement(document).value;

			const updatedUserData = {
				id: sessionData.user.id,
				newUsername: newUsername,
				newFirstName: newFirstName,
				newLastName: newLastName,
			};

			try {
				await updateUserMutation.mutateAsync(updatedUserData, {
					onSuccess: () => {
						setDataChangeInForm(false);
					},
				});
				await changeSession();
			} catch (error) {
				if (error instanceof Error) {
					if (error.message.includes('Unique constraint')) {
						setErrorMessage('This username is already taken');
					} else {
						setErrorMessage(
							'An error occurred while updating your information',
						);
					}
				}
			}
		}
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
			<div className="flex h-full flex-col bg-gray-50 px-4 py-6">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">
						Account Settings
					</h1>
					<p className="mt-2 text-gray-600">
						Update your personal information
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={(e) => void handleSubmit(e)}
					className="space-y-6"
				>
					<div className="rounded-2xl bg-white p-6 shadow-sm">
						{/* Error Message */}
						{errorMessage && (
							<div className="mb-6 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-red-700">
								<p className="text-sm font-medium">
									{errorMessage}
								</p>
							</div>
						)}

						{/* Name Fields */}
						<div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label
									htmlFor="firstName"
									className="mb-2 block text-sm font-medium text-gray-900"
								>
									First Name
								</label>
								<input
									id="firstName"
									className={`w-full rounded-xl border-2 ${
										errorMessage
											? 'border-red-500'
											: 'border-gray-200'
									} bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
									placeholder="First Name"
									defaultValue={
										sessionData.user.firstName ??
										'Loading...'
									}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="mb-2 block text-sm font-medium text-gray-900"
								>
									Last Name
								</label>
								<input
									id="lastName"
									className={`w-full rounded-xl border-2 ${
										errorMessage
											? 'border-red-500'
											: 'border-gray-200'
									} bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
									placeholder="Last Name"
									defaultValue={
										sessionData.user.lastName ??
										'Loading...'
									}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						{/* Username Field */}
						<div>
							<label
								htmlFor="username"
								className="mb-2 block text-sm font-medium text-gray-900"
							>
								Username
							</label>
							<input
								id="username"
								className={`w-full rounded-xl border-2 ${
									errorMessage
										? 'border-red-500'
										: 'border-gray-200'
								} bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
								placeholder="Username"
								defaultValue={
									sessionData.user.username ?? 'Loading...'
								}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					{/* Action Buttons */}
					{dataChangeInForm && (
						<div className="space-y-3">
							<button
								type="submit"
								className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Save Changes
							</button>
							<button
								type="button"
								onClick={handleCancelClicked}
								className="w-full rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
							>
								Cancel
							</button>
						</div>
					)}

					{/* Helper Text */}
					{!dataChangeInForm && (
						<div className="text-center text-sm text-gray-500">
							Make changes to update your information
						</div>
					)}
				</form>
			</div>
		</Layout>
	);
};

export default Account;
