import Link from 'next/link';
import React from 'react';
interface ManagePageLinkProps {
	href: string;
	title: string;
	description: string;
}

const ManagePageLink: React.FC<ManagePageLinkProps> = ({
	href,
	title,
	description,
}) => {
	return (
		<Link
			href={href}
			className="flex items-center justify-between p-3 hover:bg-gray-50"
		>
			<div className="flex flex-col space-y-0.5">
				<span className="text-base font-medium text-gray-900">
					{title}
				</span>
				<span className="text-xs text-gray-500">{description}</span>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</Link>
	);
};
export default ManagePageLink;
