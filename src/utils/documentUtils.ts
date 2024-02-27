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
): HTMLInputElement => {
	const sunday = doc.getElementById('sunday-select');
	return sunday as HTMLInputElement;
};

export const getMondaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const monday = doc.getElementById('monday-select');
	return monday as HTMLInputElement;
};

export const getTuesdaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const tuesday = doc.getElementById('tuesday-select');
	return tuesday as HTMLInputElement;
};

export const getWednesdaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const wednesday = doc.getElementById('wednesday-select');
	return wednesday as HTMLInputElement;
};

export const getThursdaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const thursday = doc.getElementById('thursday-select');
	return thursday as HTMLInputElement;
};

export const getFridaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const friday = doc.getElementById('friday-select');
	return friday as HTMLInputElement;
};

export const getSaturdaySelectInputElement = (
	doc: Document,
): HTMLInputElement => {
	const saturday = doc.getElementById('saturday-select');
	return saturday as HTMLInputElement;
};

export const getDaysSelected = (document: Document) => {
	const daysSelected: string[] = [];

	const newSundaySelect = getSundaySelectInputElement(document).checked;
	const newMondaySelect = getMondaySelectInputElement(document).checked;
	const newTuesdaySelect = getTuesdaySelectInputElement(document).checked;
	const newWednesdaySelect = getWednesdaySelectInputElement(document).checked;
	const newThursdaySelect = getThursdaySelectInputElement(document).checked;
	const newFridaySelect = getFridaySelectInputElement(document).checked;
	const newSaturdaySelect = getSaturdaySelectInputElement(document).checked;

	if (newSundaySelect) {
		daysSelected.push('sunday');
	}
	if (newMondaySelect) {
		daysSelected.push('monday');
	}
	if (newTuesdaySelect) {
		daysSelected.push('tuesday');
	}
	if (newWednesdaySelect) {
		daysSelected.push('wednesday');
	}
	if (newThursdaySelect) {
		daysSelected.push('thursday');
	}
	if (newFridaySelect) {
		daysSelected.push('friday');
	}
	if (newSaturdaySelect) {
		daysSelected.push('saturday');
	}

	return daysSelected;
};

// workout utils
export const getExerciseInputElement = (doc: Document): HTMLInputElement => {
	const exerciseSelect = doc.getElementById('exerciseId');
	return exerciseSelect as HTMLInputElement;
};

export const getWeightInputElement = (doc: Document): HTMLInputElement => {
	const weight = doc.getElementById('weightLbs');
	return weight as HTMLInputElement;
};

export const getRepsInputElement = (doc: Document): HTMLInputElement => {
	const reps = doc.getElementById('reps');
	return reps as HTMLInputElement;
};

export const getSetsInputElement = (doc: Document): HTMLInputElement => {
	const sets = doc.getElementById('sets');
	return sets as HTMLInputElement;
};

export const getSessionIdInputElement = (doc: Document): HTMLInputElement => {
	const sessionId = doc.getElementById('sessionId');
	return sessionId as HTMLInputElement;
};
