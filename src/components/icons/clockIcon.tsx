import { type IconProps } from './iconProps';

const ClockIcon: React.FC<IconProps> = ({
	heightValue,
	widthValue,
	fill: f = 'none',
	strokeColor: sc = 'black',
	strokeWidth: st = 1.5,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={f}
			viewBox="0 0 24 24"
			strokeWidth={st}
			stroke={sc}
			className={`h-${heightValue} w-${widthValue}`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	);
};

export default ClockIcon;
