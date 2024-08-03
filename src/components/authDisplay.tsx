import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { type Session } from 'next-auth/core/types';

interface AuthShowcaseProps {
	sessionData: Session | null;
}

const AuthDisplay: React.FC<AuthShowcaseProps> = () => {
	return (
		<>
			<div className="mb-5 mr-[10%] flex-col items-center justify-center gap-4">
				<button
					className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					onClick={() => void signIn('credential')}
				>
					Sign In
				</button>
			</div>
			<div className="inline-flex">
				<div>Don&apos;t have an account? </div>

				<Link
					href="/signup"
					className="ml-1 cursor-pointer text-blue-500 hover:underline"
				>
					Sign up
				</Link>
			</div>
		</>
	);
};

export default AuthDisplay;
