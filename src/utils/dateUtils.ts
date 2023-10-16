export const getYYYY = (date: Date | null | undefined): string => {
	if (date) {
        const dateObj = new Date(date)
		const year = dateObj.getFullYear();
		return year.toString();
	}
	return '';
};

export const getMonthDDCommaYYYY = (date: Date | null | undefined): string => {
    if (date) {
        const dateObj = new Date(date)
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    return '';
};