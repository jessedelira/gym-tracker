import { useState } from 'react';
import EyeIcon from './icons/eyeIcon';
import EyeSlashIcon from './icons/eyeSlashIcon';

interface PasswordInputProps {
	id?: string;
	placeholder?: string;
	isRequired?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	id,
	placeholder,
	isRequired,
}) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<div className="relative">
			<input
				id={id}
				placeholder={placeholder}
				required={isRequired}
				onChange={() => setIsShow(false)}
				className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
				type={isShow ? 'text' : 'password'}
			/>
			<button
				onClick={() => setIsShow(!isShow)}
				className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
				type="button"
			>
				{isShow ? <EyeSlashIcon /> : <EyeIcon />}
			</button>
		</div>
	);
};

export default PasswordInput;
