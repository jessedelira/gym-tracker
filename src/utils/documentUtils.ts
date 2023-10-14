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
