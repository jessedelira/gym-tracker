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
		<main className="min-h-screen bg-gray-50 px-4">
			<div className="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-semibold tracking-tight text-gray-900">
						Welcome Back
					</h1>
					<p className="mt-3 text-gray-600">
						Sign in to continue your fitness journey
					</p>
				</div>

				{/* Form Card */}
				<form
					className="space-y-6"
					onSubmit={(e) => void handleSignInSubmit(e)}
				>
					{/* Error Message */}
					{showErrorMessage && (
						<div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-red-700">
							<p className="text-sm font-medium">
								Incorrect username or password
							</p>
							<button
								onClick={handleCloseErrorMessage}
								className="ml-3 rounded-full p-1 hover:bg-red-100"
								type="button"
							>
								<XIcon className="h-4 w-4" />
							</button>
						</div>
					)}

					{/* Input Fields */}
					<div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
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

					{/* Action Buttons */}
					<div className="space-y-4">
						<button
							className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							type="submit"
						>
							Sign In
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
