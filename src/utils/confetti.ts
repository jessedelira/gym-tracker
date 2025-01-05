import JSConfetti from 'js-confetti';

export const showConfetti = () => {
    const jsConfetti = new JSConfetti();
    return jsConfetti.addConfetti({
        confettiRadius: 10,
        confettiNumber: 20,
        emojis: ['🎉', '🎊'],
        emojiSize: 50,
    });
}; 