import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { type Session } from 'next-auth/core/types';

interface AuthShowcaseProps {
	sessionData: Session | null;
}

const AuthDisplay: React.FC<AuthShowcaseProps> = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4">
				<button
					className="ml-[-2%] mr-[5%] rounded-full border-2 bg-red-500 px-10 py-3 font-semibold text-white no-underline transition hover:border-2 hover:border-red-500 hover:bg-white hover:text-black"
					onClick={() => void signIn('credential')}
				>
					Sign In
				</button>
				<Link
					className="rounded-full border-2 border-red-500 bg-white px-10 py-3 font-semibold text-black no-underline transition hover:border-2 hover:bg-red-500 hover:text-white"
					href="/signup"
				>
					Sign Up
				</Link>
			</div>
		</>
	);
};

export default AuthDisplay;
