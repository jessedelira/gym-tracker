import { signOut } from 'next-auth/react';
import Link from 'next/link';
import ClockIcon from './icons/clockIcon';
import { useEffect, useState } from 'react';
import HomeIcon from './icons/homeIcon';
import ManageIcon from './icons/manageIcon';
import SettingsIcon from './icons/settingsIcon';
import { usePathname } from 'next/navigation';

type ValidRoutes = 'home' | 'manage' | 'settings' | 'clock' | '';

const isValidRoute = (route: string): route is ValidRoutes => {
	return ['home', 'manage', 'settings', 'clock', ''].includes(route);
};

const NavBar: React.FC = () => {
	const [currentURL, setCurrentURL] = useState<ValidRoutes>('');
	const pathname = usePathname();

	useEffect(() => {
		const path = pathname?.split('/')[1] || '';
		if (isValidRoute(path)) {
			setCurrentURL(path);
		} else {
			setCurrentURL('');
		}
	}, [pathname]);

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white pb-safe">
			<Link href="/home" className="rounded-full text-5xl">
				{currentURL === 'home' ? (
					<HomeIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="black"
					/>
				) : (
					<HomeIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="gray"
					/>
				)}
			</Link>

			<Link href="/manage" className="rounded-full text-5xl">
				{currentURL === 'manage' ? (
					<ManageIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="black"
					/>
				) : (
					<ManageIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="gray"
					/>
				)}
			</Link>

			<Link href="/settings" className="rounded-full text-5xl">
				{currentURL === 'settings' ? (
					<SettingsIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="black"
					/>
				) : (
					<SettingsIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="gray"
					/>
				)}
			</Link>

			<Link href="/clock" className="rounded-full text-5xl">
				{currentURL === 'clock' ? (
					<ClockIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="black"
					/>
				) : (
					<ClockIcon
						heightValue="8"
						widthValue="8"
						fill="none"
						strokeColor="gray"
					/>
				)}
			</Link>

			<button
				className="rounded-full text-5xl"
				onClick={() => void signOut()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="red"
					className="h-8 w-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
					/>
				</svg>
			</button>
		</nav>
	);
};

export default NavBar;
