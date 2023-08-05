import { type NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FormEvent } from 'react';

import { api } from '~/utils/api';

const SignUp: NextPage = () => {
	const createUserMutation = api.user.createUser.useMutation();
	const router = useRouter();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const username = (
			document.getElementById('username') as HTMLInputElement
		).value;
		const password = (
			document.getElementById('password') as HTMLInputElement
		).value;
		const firstName = (
			document.getElementById('firstName') as HTMLInputElement
		).value;
		const lastName = (
			document.getElementById('lastName') as HTMLInputElement
		).value;

		const createUserData = {
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName,
		};
		createUserMutation.mutate(createUserData);
		void router.push('auth/signin');
		e.preventDefault();
	};

	return (
		<>
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
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>
						<input
							type="password"
							placeholder="Password"
							id="password"
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>
						<input
							type="text"
							placeholder="First Name"
							id="firstName"
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>
						<input
							type="text"
							placeholder="Last Name"
							id="lastName"
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						/>

						<button
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
							type="submit"
						>
							Sign Up
						</button>
					</form>
					<button className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20">
						<Link href="/">Back</Link>
					</button>
				</div>
			</main>
		</>
	);
};

export default SignUp;
