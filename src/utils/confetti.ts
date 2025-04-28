import { Preference } from '@prisma/client';
import JSConfetti from 'js-confetti';
import { type BaseUser } from '~/server/auth';

export const showConfetti = () => {
	const jsConfetti = new JSConfetti();
	return jsConfetti.addConfetti({
		confettiRadius: 10,
		confettiNumber: 20,
		emojis: ['🎉', '🎊'],
		emojiSize: 50,
	});
};

export const isConfettiEnabled = (user: BaseUser) => {
	return user.userPreferences.some(
		(preference) =>
			preference.preference ===
				Preference.CONFETTI_ON_SESSION_COMPLETION &&
			preference.enabled === true,
	);
};
