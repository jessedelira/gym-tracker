import Link from 'next/link';
import React from 'react';

interface ChangelogNotificationProps {
	onDismiss: () => void;
}

const ChangelogNotification: React.FC<ChangelogNotificationProps> = ({
	onDismiss,
}) => {
	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-blue-50 p-4 shadow-lg sm:left-auto sm:right-4 sm:w-96">
			<div className="flex items-start">
				<div className="flex-shrink-0">
					<svg
						className="h-5 w-5 text-blue-600"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3 flex-1">
					<p className="text-sm font-medium text-blue-800">
						New updates available!
					</p>
					<p className="mt-1 text-sm text-blue-700">
						Check out what&apos;s new in the latest version of Gym
						Tracker.
					</p>
					<div className="mt-4 flex space-x-3">
						<Link
							href="/settings/changelog"
							className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							View Changes
						</Link>
						<button
							type="button"
							onClick={onDismiss}
							className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Dismiss
						</button>
					</div>
				</div>
				<div className="ml-4 flex flex-shrink-0">
					<button
						type="button"
						onClick={onDismiss}
						className="inline-flex rounded-md bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						<span className="sr-only">Dismiss</span>
						<svg
							className="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangelogNotification;
