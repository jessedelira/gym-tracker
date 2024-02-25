// Create Account Utils
export const getUsernameInputElement = (doc: Document): HTMLInputElement => {
	const username = doc.getElementById('username');
	return username as HTMLInputElement;
};

export const getFirstNameInputElement = (doc: Document): HTMLInputElement => {
	const firstName = doc.getElementById('firstName');
	return firstName as HTMLInputElement;
};

export const getLastNameInputElement = (doc: Document): HTMLInputElement => {
	const lastName = doc.getElementById('lastName');
	return lastName as HTMLInputElement;
};

export const getPasswordInputElement = (doc: Document): HTMLInputElement => {
	const password = doc.getElementById('password');
	return password as HTMLInputElement;
};

// Create Routine Utils
export const getRoutineNameInputElement = (doc: Document): HTMLInputElement => {
	const routineName = doc.getElementById('routineName');
	return routineName as HTMLInputElement;
};

export const getRoutineDescriptionInputElement = (
	doc: Document,
): HTMLInputElement => {
	const routineDescription = doc.getElementById('routineDescription');
	return routineDescription as HTMLInputElement;
};

// Create Session Utils
export const getSessionNameInputElement = (doc: Document): HTMLInputElement => {
	const sessionName = doc.getElementById('sessionName');
	return sessionName as HTMLInputElement;
};

export const getSessionDescriptionInputElement = (
	doc: Document,
): HTMLInputElement => {
	const sessionDescription = doc.getElementById('sessionDescription');
	return sessionDescription as HTMLInputElement;
};

export const getSundaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const sunday = doc.getElementById('sunday-select');
	return sunday as HTMLSelectElement;
};

export const getMondaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const monday = doc.getElementById('monday-select');
	return monday as HTMLSelectElement;
};

export const getTuesdaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const tuesday = doc.getElementById('tuesday-select');
	return tuesday as HTMLSelectElement;
};

export const getWednesdaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const wednesday = doc.getElementById('wednesday-select');
	return wednesday as HTMLSelectElement;
};

export const getThursdaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const thursday = doc.getElementById('thursday-select');
	return thursday as HTMLSelectElement;
};

export const getFridaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const friday = doc.getElementById('friday-select');
	return friday as HTMLSelectElement;
};

export const getSaturdaySelectInputElement = (
	doc: Document,
): HTMLSelectElement => {
	const saturday = doc.getElementById('saturday-select');
	return saturday as HTMLSelectElement;
};
