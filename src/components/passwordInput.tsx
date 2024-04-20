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
				className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
				type={isShow ? 'text' : 'password'}
			/>
			<button
				onClick={() => setIsShow(!isShow)}
				className="absolute right-3 top-1/2 -translate-y-1/2 transform"
				type="button"
			>
				{isShow ? <EyeSlashIcon /> : <EyeIcon />}
			</button>
		</div>
	);
};

export default PasswordInput;
