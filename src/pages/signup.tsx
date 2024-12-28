import { type NextPage } from 'next';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
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
				},
			},
		);
	};

	return (
		<>
			{showModal && <AccountCreatedModal></AccountCreatedModal>}

			<main className="flex h-screen items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-2xl text-black">Create Account</h1>
					<form
						className="flex flex-col items-center justify-center gap-4"
						onSubmit={(e) => void handleSubmit(e)}
					>
						<input
							type="text"
							placeholder="Username"
							id="username"
							className="rounded-lg bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
							required
						/>
						<PasswordInput
							id="password"
							placeholder="Password"
							isRequired
						/>
						<input
							type="text"
							placeholder="First Name"
							id="firstName"
							className="rounded-lg bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>
						<input
							type="text"
							placeholder="Last Name"
							id="lastName"
							className="rounded-lg bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>

						<select
							id="timezone"
							className="max-w-xs rounded-lg bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						>
							{timezones?.map((timezone) => (
								<option
									key={timezone.timezone}
									value={timezone.id}
								>
									{timezone.timezone}
								</option>
							))}
						</select>

						<button
							className="rounded-lg bg-primaryButton p-3 font-semibold text-black no-underline transition hover:bg-black/20"
							type="submit"
						>
							Sign Up
						</button>
					</form>

					<Link
						href="/"
						className="rounded-lg bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					>
						Back
					</Link>
				</div>
			</main>
		</>
	);
};

export default SignUp;
