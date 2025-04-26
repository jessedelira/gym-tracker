import Link from 'next/link';
import React from 'react';

export const WelcomeNewUserView = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
			<div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
				<svg
					className="h-8 w-8 text-blue-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>

			<h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
				Welcome to Gym Tracker!
			</h2>

			<p className="mb-8 text-gray-600">
				Let&apos;s get started by creating your first workout routine
			</p>

			<Link
				href="/manage/routines"
				className="w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
			>
				Create Routine
			</Link>
		</div>
	);
};
