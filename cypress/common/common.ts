export const login = () => {
	const username = 'superuser';
	const password = 'superuser';

	cy.visit('http://localhost:3000');
	cy.get('button').contains('Sign In').click();
	cy.get('#username').type('superuser');
	cy.get('#password').type('superuser');
	cy.get('button').contains('Sign In').click();
};
