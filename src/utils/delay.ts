export const delay = (durationMs: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, durationMs));
};
