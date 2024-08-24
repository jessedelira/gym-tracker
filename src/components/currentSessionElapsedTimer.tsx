import React, { useEffect, useState } from 'react';

interface CurrentSessionElapsedTimerProps {
	startedAtDate: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentSessionElapsedTimerProps> = ({
	startedAtDate,
}) => {
	const [elapsedTime, setElapsedTime] = useState<string | null>();

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date();

			const elapsedMilliseconds =
				currentTime.getTime() - startedAtDate.getTime();

			const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000);
			const elapsedSeconds = Math.floor(
				(elapsedMilliseconds % 60000) / 1000,
			);

			setElapsedTime(`${elapsedMinutes} min ${elapsedSeconds} sec`);
		}, 1);

		return () => clearInterval(interval);
	}, [startedAtDate]);

	return <h2 className="text-[#666666]">Elapsed time: {elapsedTime}</h2>;
};

export default CurrentWorkoutDisplay;
