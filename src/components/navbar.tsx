import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface NavBarProps {
	sessionData: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({ sessionData }) => {
	return (
		<nav className="flex h-[4rem] w-full flex-row items-center justify-between border-b-4 border-b-black bg-white">
			<div className="flex flex-row items-center justify-between gap-4">
				<Link href="/home" className="ml-3 rounded-full text-5xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
				</Link>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-1xl text-center text-black">
					Welcome, {sessionData?.user?.firstName}
				</p>
			</div>

			<div className="flex flex-row items-center justify-between gap-4">
				<button
					className=" mr-3 rounded-full text-5xl"
					onClick={() => void signOut()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
