import { type Preference } from '@prisma/client';

export interface PreferenceOption {
	id: Preference;
	title: string;
	description: string;
}

const PreferenceToggle: React.FC<{
	option: PreferenceOption;
	onToggle: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	isEnabled: boolean;
}> = ({ option, onToggle, isEnabled }) => (
	<div className="flex items-center justify-between">
		<div>
			<h3 className="text-lg font-medium">{option.title}</h3>
			<p className="text-muted-foreground">{option.description}</p>
		</div>

		<div className="inline-flex items-center">
			<div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
				<input
					id={option.id}
					type="checkbox"
					className="bg-blue-gray-100 peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full border border-black transition-colors duration-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
					onClick={onToggle}
					defaultChecked={isEnabled}
				/>
				<label
					htmlFor={option.id}
					className="before:content[''] border-blue-gray-100 before:bg-blue-gray-500 absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
				>
					<div
						className="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full"
						data-ripple-dark="true"
					></div>
				</label>
			</div>
		</div>
	</div>
);

export default PreferenceToggle;
