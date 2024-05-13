import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import XIcon from '~/components/icons/xIcon';
import PasswordInput from '~/components/passwordInput';

interface SignInProps {
	csrfToken: InferGetServerSidePropsType<
		typeof GetServerSideProps
	>['csrfToken'];
}

const SignIn: NextPage<SignInProps> = ({ csrfToken }) => {
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const router = useRouter();

	const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const username = (
			document.getElementById('username') as HTMLInputElement
		).value;
		const password = (
			document.getElementById('password') as HTMLInputElement
		).value;

		const response = await signIn('credentials', {
			callbackUrl: '/',
			csrfToken,
			username: username,
			password: password,
			redirect: false, // This is important for error hanlding, do not want to redirect
		});

		if (response?.status === 200 && response?.ok) {
			void router.push('/');
		} else {
			setShowErrorMessage(true);
		}
	};

	const handleCloseErrorMessage = () => {
		setShowErrorMessage(false);
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="mb-4 text-2xl text-black">
					Sign in to Gym Tracker
				</h1>
				<form
					className="flex flex-col items-center justify-center gap-4"
					onSubmit={(e) => void handleSignInSubmit(e)}
				>
					{showErrorMessage && (
						<div className="flex justify-center rounded-full border-2 border-red-300 bg-red-200 p-3">
							<p className=" text-sm">
								Incorrect username or password.
							</p>
							<button
								className="ml-1"
								onClick={handleCloseErrorMessage}
							>
								<XIcon />
							</button>
						</div>
					)}
					<input
						type="text"
						placeholder="Username"
						id="username"
						className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						required
					/>
					<PasswordInput
						id="password"
						placeholder="Password"
						isRequired
					/>
					<button
						className="rounded-full bg-green-600/90 px-16 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						type="submit"
					>
						Sign In
					</button>
					<Link
						href="/"
						className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					>
						Back
					</Link>
				</form>
			</div>
		</div>
	);
};

const GetServerSideProps = async (context: GetServerSidePropsContext) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};

export default SignIn;
