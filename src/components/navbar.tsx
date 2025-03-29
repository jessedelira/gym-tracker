import Link from 'next/link';
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
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-gray-200 bg-white">
			<Link href="/home" className="rounded-full pb-4 text-5xl">
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

			<Link href="/manage" className="rounded-full pb-4 text-5xl">
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

			<Link href="/settings" className="rounded-full pb-4 text-5xl">
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
		</nav>
	);
};

export default NavBar;
