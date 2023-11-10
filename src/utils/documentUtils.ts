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
