describe('Login', () => {
    it('Should login when correct credentials', () => {
        cy.visit('https://localhost:4200')
        // Fields
        cy.get('[data-cy="username"]').should('be.enabled')
        cy.get('[data-cy="password"]').should('be.enabled')
        // Sliders
        // cy.get('.mat-slide-toggle-bar').click()
        // cy.get('.mat-slide-toggle-bar').click()
        cy.get('label.mat-slide-toggle-label').eq(0).should('be.checked')
        // Buttons
        cy.get('[data-cy="forgotPassword"]').should('be.enabled')
        cy.get('[data-cy="login"]').should('be.disabled')
    })
})