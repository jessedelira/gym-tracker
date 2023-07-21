import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';

interface SignInProps {
	csrfToken: InferGetServerSidePropsType<
		typeof getServerSideProps
	>['csrfToken'];
}

const SignIn: NextPage<SignInProps> = ({ csrfToken }) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const username = (
			document.getElementById('username') as HTMLInputElement
		).value;
		const password = (
			document.getElementById('password') as HTMLInputElement
		).value;
		e.preventDefault();
		await signIn('credentials', {
			callbackUrl: '/',
			csrfToken,
			username: username,
			password: password,
		});
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl text-black">Sign In</h1>
				<form
					className="flex flex-col items-center justify-center gap-4"
					onSubmit={(e) => void handleSubmit(e)}
				>
					<input
						type="text"
						placeholder="Username"
						id="username"
						className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						required
					/>
					<input
						type="password"
						placeholder="Password"
						id="password"
						className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						required
					/>
					<button
						className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						type="submit"
					>
						Sign In
					</button>
					<button className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20">
						<Link href="/">Back</Link>
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
