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
			className="rounded-md bg-gray-300 px-4 py-2 text-xl font-semibold text-white  "
		>
			<div className="flex">
				<div className="w-90">
					{title}
					<p className="text-sm font-normal">{description}</p>
				</div>

				<div className="w-5 pt-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</div>
			</div>
		</Link>
	);
};
export default ManagePageLink;
