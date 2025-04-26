import { Preference } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface CurrentSessionElapsedTimerProps {
	startedAtDate?: Date;
}

const CurrentWorkoutDisplay: React.FC<CurrentSessionElapsedTimerProps> = ({
	startedAtDate,
}) => {
	const [elapsedMinutes, setElapsedMinutes] = useState<string>('0');
	const [elapsedSeconds, setElapsedSeconds] = useState<string>('0');
	const { data: sessionData } = useSession();

	useEffect(() => {
		const currentTime = new Date();
		const elapsedMilliseconds =
			currentTime.getTime() - (startedAtDate?.getTime() ?? 0);
		const initialMinutes = Math.floor(elapsedMilliseconds / 60000);
		const initialSeconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

		setElapsedMinutes(`${initialMinutes}`);
		setElapsedSeconds(`${initialSeconds}`);

		const interval = setInterval(() => {
			const currentTime = new Date();
			const elapsedMilliseconds =
				currentTime.getTime() - (startedAtDate?.getTime() ?? 0);

			const elapsedMinutes = Math.floor(elapsedMilliseconds / 60000);
			const elapsedSeconds = Math.floor(
				(elapsedMilliseconds % 60000) / 1000,
			);

			setElapsedMinutes(`${elapsedMinutes}`);
			setElapsedSeconds(`${elapsedSeconds}`);
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAtDate]);

	return (
		<h2 className="text-[#666666]">
			Elapsed time: {elapsedMinutes} min{' '}
			{sessionData?.user.userPreferences?.some(
				(preference) =>
					preference.preference ===
						Preference.SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION &&
					preference.enabled === true,
			)
				? ` ${elapsedSeconds} sec`
				: ''}{' '}
		</h2>
	);
};

export default CurrentWorkoutDisplay;
