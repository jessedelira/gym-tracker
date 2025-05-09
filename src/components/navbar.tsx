import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import HomeIcon from './icons/homeIcon';
import ManageIcon from './icons/manageIcon';
import SettingsIcon from './icons/settingsIcon';
import { usePathname } from 'next/navigation';

type ValidRoutes = 'home' | 'manage' | 'settings' | '';

const isValidRoute = (route: string): route is ValidRoutes => {
	return ['home', 'manage', 'settings', 'clock', ''].includes(route);
};

const NavBar: React.FC = () => {
	const [currentURL, setCurrentURL] = useState<ValidRoutes>('');
	const pathname = usePathname();
	const { data: sessionData } = useSession();

	useEffect(() => {
		const path = pathname?.split('/')[1] || '';
		if (isValidRoute(path)) {
			setCurrentURL(path);
		} else {
			setCurrentURL('');
		}
	}, [pathname]);

	return (
		<div className="mx-auto flex h-full max-w-md items-center justify-around border-t border-gray-200 bg-white pb-4">
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
				className={`relative flex flex-col items-center px-6 py-2 ${
					currentURL === 'settings'
						? 'text-black'
						: 'text-gray-500 hover:text-gray-800'
				}`}
			>
				{sessionData?.user &&
					!sessionData.user.hasSeenLatestChangelog && (
						<div className="absolute right-4 top-1 h-2 w-2 rounded-full bg-red-500" />
					)}
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
	);
};

export default NavBar;
