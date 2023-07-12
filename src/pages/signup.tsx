import { type NextPage } from 'next';
import Link from 'next/link';
import { type FormEvent } from 'react';

const SignUp: NextPage = () => {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const username = (
			document.getElementById('username') as HTMLInputElement
		).value;
		const password = (
			document.getElementById('password') as HTMLInputElement
		).value;
		console.log(username, password);
	}

	return (
		<>
			<main className="flex items-center justify-center h-screen">
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
