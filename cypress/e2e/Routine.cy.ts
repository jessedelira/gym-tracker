import { login } from "cypress/common/common";

describe('routine', () => {
	it('user successfully creates routine', () => {
        login();
        
		cy.get('[data-testid="manage-button"]').click(); 
		cy.get('[data-testid="manage-page-link"]').click();
		cy.get('[data-testid="create-routine-button"]').click();
		cy.get('[data-testid="routine-name-input"]').type('day3');
		cy.get('[data-testid="routine-desc-input"]').type('arm day description');
		cy.get('[data-testid="routine-submit-button"]').click();
		cy.get('[data-testid="routine-row-leg day"]').should('exist');	
	});
});
