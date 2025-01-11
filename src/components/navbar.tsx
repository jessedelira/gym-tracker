import { signOut } from 'next-auth/react';
import Link from 'next/link';
import ClockIcon from './icons/clockIcon';
import { useEffect, useState } from 'react';
import HomeIcon from './icons/homeIcon';
import ManageIcon from './icons/manageIcon';
import SettingsIcon from './icons/settingsIcon';

const NavBar: React.FC = () => {
	const [currentURL, setCurrentURL] = useState<string>('');

	const getCurrentURL = (): string => {
		const url = window.location.href;
		switch (true) {
			case url.includes('home'):
				setCurrentURL('home');
				break;
			case url.includes('manage'):
				setCurrentURL('manage');
				break;
			case url.includes('settings'):
				setCurrentURL('settings');
				break;
			case url.includes('clock'):
				setCurrentURL('clock');
				break;
			default:
				break;
		}

		return window.location.href;
	};

	useEffect(() => {
		getCurrentURL();
	}, []);

	return (
		<div className="flex flex-row justify-around items-center h-16 bg-white border-t">
			<div id="home" className="mb-8 flex flex-row items-center ">
				<Link
					href="/home"
					className="ml-3 rounded-full text-5xl"
					onClick={getCurrentURL}
				>
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
			</div>
			<div id="manage" className="mb-8 flex flex-row items-center">
				<Link href="/manage" className="ml-3 rounded-full text-5xl">
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
			</div>
			<div id="settings" className="mb-8 flex flex-row items-center ">
				<Link href="/settings" className="ml-3 rounded-full text-5xl">
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
			</div>
			<div id="clock" className="mb-8 flex flex-row items-center ">
				<Link href="/clock" className="ml-3 rounded-full text-5xl">
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
			</div>
			<div id="signout" className="mb-8 flex flex-row items-center">
				<button
					className=" mr-3 rounded-full text-5xl"
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
			</div>
		</div>
	);
};

export default NavBar;
