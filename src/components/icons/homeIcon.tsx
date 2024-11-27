import React from 'react';
import { type IconProps } from './iconProps';

const HomeIcon: React.FC<IconProps> = ({
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
				d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			/>
		</svg>
	);
};

export default HomeIcon;
