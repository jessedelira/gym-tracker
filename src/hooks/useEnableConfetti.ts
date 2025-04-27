import { Preference } from '@prisma/client';
import { useEffect, useState } from 'react';
import { type BaseUser } from '~/server/auth';

export const useEnableConfetti = (user: BaseUser) => {
	const [isConfettiEnabled, setIsConfettiEnabled] = useState<boolean>(false);

	useEffect(() => {
		setIsConfettiEnabled(
			user.userPreferences.some(
				(preference) =>
					preference.preference ===
						Preference.CONFETTI_ON_SESSION_COMPLETION &&
					preference.enabled === true,
			),
		);
	}, [user.userPreferences]);

	return isConfettiEnabled;
};
