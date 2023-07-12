import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface NavBarProps {
	sessionData: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({ sessionData }) => {
	const getDate = (): string => {
		const date = new Date();
		const day = date.getDate();
		// get the name of the current month short
		const monthName = date.toLocaleString('default', { month: 'short' });
		// get name of current day, short version
		const dayName = date.toLocaleString('default', { weekday: 'short' });
		// format the dat to be "day number day name month year"

		return ` ${dayName} ${monthName} ${day}`;
	};

	return (
		<nav className="flex h-[4rem] w-full flex-row items-center justify-between border-b-4 border-b-black bg-white">
			<div className="flex flex-row items-center justify-between gap-4">
				<Link href="/home" className="ml-3 rounded-full text-5xl">
					🏠
				</Link>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-1xl text-center text-black">
					{sessionData && sessionData.user?.firstName}&apos;s Workout
				</p>
				<p className="text-1xl text-center text-black">{getDate()}</p>
			</div>

			<div className="flex flex-row items-center justify-between gap-4">
				<button
					className="ml-3 rounded-full text-5xl "
					onClick={() => void signOut()}
				>
					🔒
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
