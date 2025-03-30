import Link from 'next/link';
import React from 'react';

const AccountCreatedModal: React.FC = () => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>

			{/* Modal Content */}
			<div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
				<div className="mb-6 inline-flex rounded-full bg-green-100 p-3">
					<svg
						className="h-6 w-6 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
					Account Created!
				</h2>

				<p className="mb-6 text-gray-600">
					Your account has been created successfully. Sign in to start
					your fitness journey.
				</p>

				<Link
					href="/auth/signin"
					className="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
				>
					Sign In
				</Link>
			</div>
		</div>
	);
};

export default AccountCreatedModal;
