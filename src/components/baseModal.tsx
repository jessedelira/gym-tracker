import Link from 'next/link';
import React from 'react';

interface BaseModalProps {
	redirectUrl: string;
	headerMessage: string;
	bodyMessage: string;
	buttonText: string;
	onClick?: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
	redirectUrl,
	headerMessage,
	bodyMessage,
	buttonText,
	onClick,
}) => {
	return (
		<>
			<div className="fixed inset-0 z-10 flex items-center justify-center">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="z-10 max-w-[23rem] rounded-lg bg-white p-8">
					<h1 className="text-center text-2xl text-black">
						{headerMessage}
					</h1>
					<p className="mb-4 text-center text-black">{bodyMessage}</p>
					<div className="flex flex-col items-center justify-center gap-4">
						<button

							onClick={onClick}
							className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
						>
							{buttonText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default BaseModal;
