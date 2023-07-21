import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

interface ModalProps {
	showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ showModal }) => {
	const handleClick = () => {
		console.log('hi');
	};

	return (
		<>
			{showModal ? (
				<>
					<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
						<div className="relative mx-auto my-6 w-auto max-w-3xl">
							{/*content*/}
							<div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
									<h3 className="text-3xl font-semibold">
										Modal Title
									</h3>
									<button
										className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
										onClick={handleClick}
									>
										<span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative flex-auto p-6">
									<p className="my-4 text-lg leading-relaxed text-slate-500">
										I always felt like I could do anything.
										That&apos;s the main thing people are
										controlled by! Thoughts- their
										perception of themselves! They&apos;re
										slowed down by their perception of
										themselves. If you&apos;re taught you
										can&apos;t do anything, you won’t do
										anything. I was taught I could do
										everything.
									</p>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
									<button
										className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
										type="button"
									>
										Close
									</button>
									<button
										className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
										type="button"
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="fixed inset-0 z-40 bg-black opacity-25"></div>
				</>
			) : null}
		</>
	);
};

export default Modal;
