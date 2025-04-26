import { type Preference } from '@prisma/client';

export interface PreferenceOption {
	id: Preference;
	title: string;
	description: string;
}

interface PreferenceToggleProps {
	option: PreferenceOption;
	onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isEnabled: boolean;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
	option,
	onToggle,
	isEnabled,
}: PreferenceToggleProps) => {
	return (
		<label className="relative inline-flex cursor-pointer items-center">
			<input
				type="checkbox"
				id={option.id}
				className="peer sr-only"
				onChange={(e) => onToggle(e)}
				checked={isEnabled}
			/>
			<div className="h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-7 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
		</label>
	);
};

export default PreferenceToggle;
