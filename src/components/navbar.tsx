import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface NavBarProps {
	sessionData: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({ sessionData }) => {
	const router = useRouter();

	// When using an external URL with next/image, you need to add the domain to the next.config.js file and you will also have to create a loader for the image
	const profileIconLoader = () => {
		if (!sessionData?.user.username)
			return 'https://robohash.org/anonymouse';
		return `https://robohash.org/${sessionData.user.username}`;
	};

	return (
		// create a NavBar component with tailwind styling that matches the design of index page
		<nav className="flex h-[4rem] w-full flex-row items-center justify-between border-b-4 border-b-black bg-white">
			<div className="flex flex-row items-center justify-between gap-4">
				<Link
					href="/home"
					className="ml-3 rounded-full text-5xl hover:bg-black/20"
				>
					🏠
				</Link>
				<p className="text-2xl text-black">
					Hi, {sessionData && sessionData.user?.username}!
				</p>
			</div>
			<div className="mr-1000 flex flex-row items-center justify-between gap-4">
				<Link
					className=" rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					href="/createmail"
				>
					📬
				</Link>
			</div>
			{/* create button with tailwind style with next/Image */}

			{/* create div with class that is divided into two parts */}

			{/* create div with tailwind style that centers all items the middle height */}
			<div className="flex flex-row items-center justify-between gap-4">
				<button
					// class className center image
					className=" rounded-full bg-black/10 px-3 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					onClick={() => void router.push('/user/settings')}
				>
					<Image
						priority
						src={profileIconLoader()}
						alt="Settings Icon"
						width={25}
						height={25}
						className="rounded-full"
					/>
				</button>
				<button
					className=" rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
					onClick={() =>
						void signOut({ callbackUrl: 'http://localhost:3000/' })
					}
				>
					Sign Out
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
