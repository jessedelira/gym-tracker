import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import XMark from '~/components/XMark';
import BaseModal from '~/components/baseModal';
import PasswordInput from '~/components/passwordInput';

const GetServerSideProps = async (context: GetServerSidePropsContext) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};

interface SignInProps {
	csrfToken: InferGetServerSidePropsType<
		typeof GetServerSideProps
	>['csrfToken'];
}

interface ErrorModalDetails {
	status: number | undefined;
	error: string | undefined;
}

const SignIn: NextPage<SignInProps> = ({ csrfToken }) => {
	const [responseDetails, setResDetails] = useState<
		ErrorModalDetails | undefined
	>(undefined);
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check if there's an error query parameter
		if (router.query.error) {
			setResDetails({
				status: 401,
				error: 'Incorrect username or password.',
			});
		}
	}, [router.query]);

	useEffect(() => {
		if (responseDetails?.status !== 200 && responseDetails !== undefined) {
			setShowModal(true);
		}
	}, [responseDetails]);

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
			redirect: false, // This is important for error hanlding
		});

		if (response?.status === 200) {
			void router.push('/');
		} else {
			setShowModal(true);
			console.log(response);
		}
	};

	const handleCloseErrorMessage = () => {
		setShowModal(false);
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
					{showModal && (
						<div className="flex justify-center rounded-full border-2 border-red-300 bg-red-200 p-3">
							<p className=" text-sm">
								Incorrect username or password.
							</p>
							<button
								className="ml-1"
								onClick={handleCloseErrorMessage}
							>
								<XMark />
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

export default SignIn;
