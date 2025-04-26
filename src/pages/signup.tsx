import { type NextPage } from 'next';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import AccountCreatedModal from '~/components/accountCreatedModal';
import PasswordInput from '~/components/passwordInput';

import { api } from '~/utils/api';
import {
	getFirstNameInputElement,
	getLastNameInputElement,
	getPasswordInputElement,
	getTimezoneInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const SignUp: NextPage = () => {
	const createUserMutation = api.user.createUser.useMutation();
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const { data: timezones } = api.timezoneMap.getListOfTimezones.useQuery();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const username = getUsernameInputElement(document).value;
		const password = getPasswordInputElement(document).value;
		const firstName = getFirstNameInputElement(document).value;
		const lastName = getLastNameInputElement(document).value;
		const timezoneId = getTimezoneInputElement(document).value;

		createUserMutation.mutate(
			{
				username: username,
				password: password,
				firstName: firstName,
				lastName: lastName,
				timezoneId: timezoneId,
			},
			{
				onSuccess: () => {
					setShowModal(true);
					// Wait for 1 second to show the modal, then sign in
					setTimeout(() => {
						void signIn('credentials', {
							username,
							password,
							redirect: false,
						}).then((result) => {
							if (result?.ok) {
								void router.push('/');
							}
						});
					}, 1500);
				},
			},
		);
	};

	return (
		<>
			{showModal && <AccountCreatedModal />}

			<main className="min-h-screen bg-gray-50 px-4">
				<div className="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
					<div className="mb-8 text-center">
						<h1 className="text-3xl font-semibold tracking-tight text-gray-900">
							Create Account
						</h1>
						<p className="mt-3 text-gray-600">
							Start your fitness journey today
						</p>
					</div>

					<form
						className="space-y-6"
						onSubmit={(e) => void handleSubmit(e)}
					>
						<div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
							{/* Account Details Section */}
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Username"
									id="username"
									className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
									required
								/>
								<PasswordInput
									id="password"
									placeholder="Password"
									isRequired
								/>
							</div>

							{/* Personal Details Section */}
							<div className="space-y-4">
								<div className="flex gap-4">
									<input
										type="text"
										placeholder="First Name"
										id="firstName"
										className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
									/>
									<input
										type="text"
										placeholder="Last Name"
										id="lastName"
										className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
									/>
								</div>

								<select
									id="timezone"
									className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								>
									{timezones?.map((timezone) => (
										<option
											key={timezone.display}
											value={timezone.id}
										>
											{timezone.display}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-4">
							<button
								className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								type="submit"
							>
								Create Account
							</button>
							<Link
								href="/"
								className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
							>
								Back to Home
							</Link>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default SignUp;
