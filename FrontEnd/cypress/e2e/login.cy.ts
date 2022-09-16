context('Login', () => {

    describe('Login', () => {

        it('Should navigate to the login page', () => {

            cy.visit('https://localhost:4200')
            // Fields
            cy.get('[data-cy="username"]').should('be.enabled')
            cy.get('[data-cy="password"]').should('be.enabled')
            cy.get('[data-cy="no-robot"]').should('not.be.checked')
            // Buttons
            cy.get('[data-cy="forgotPassword"]').should('be.enabled')
            cy.get('[data-cy="login"]').should('be.disabled')

        })

    })

})