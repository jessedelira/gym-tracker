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
		<nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe backdrop-blur-lg">
			<div className="mx-auto flex h-16 max-w-md items-center justify-around border-t border-gray-200 bg-white/90">
				<Link
					href="/home"
					className={`flex flex-col items-center px-6 py-2 ${
						currentURL === 'home'
							? 'text-black'
							: 'text-gray-500 hover:text-gray-800'
					}`}
				>
					<HomeIcon
						heightValue="6"
						widthValue="6"
						fill="none"
						strokeColor={
							currentURL === 'home' ? 'black' : 'currentColor'
						}
					/>
					<span className="mt-1 text-xs font-medium">Home</span>
				</Link>

				<Link
					href="/manage"
					className={`flex flex-col items-center px-6 py-2 ${
						currentURL === 'manage'
							? 'text-black'
							: 'text-gray-500 hover:text-gray-800'
					}`}
				>
					<ManageIcon
						heightValue="6"
						widthValue="6"
						fill="none"
						strokeColor={
							currentURL === 'manage' ? 'black' : 'currentColor'
						}
					/>
					<span className="mt-1 text-xs font-medium">Manage</span>
				</Link>

				<Link
					href="/settings"
					className={`flex flex-col items-center px-6 py-2 ${
						currentURL === 'settings'
							? 'text-black'
							: 'text-gray-500 hover:text-gray-800'
					}`}
				>
					<SettingsIcon
						heightValue="6"
						widthValue="6"
						fill="none"
						strokeColor={
							currentURL === 'settings' ? 'black' : 'currentColor'
						}
					/>
					<span className="mt-1 text-xs font-medium">Settings</span>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
