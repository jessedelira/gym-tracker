import React from 'react';

type Props = {
	onClick: () => void;
};

const ProceedAccountDeletingButton: React.FC<Props> = ({ onClick }) => {
	return (
		<div className="px-2">
			<button
				type="button"
				className="rounded-full bg-red-500 px-10 py-3 font-semibold text-white no-underline transition hover:bg-red-600"
				onClick={onClick}
			>
				If you agree to terms above, click here to proceed with account
				deletion
			</button>
		</div>
	);
};

export default ProceedAccountDeletingButton;
