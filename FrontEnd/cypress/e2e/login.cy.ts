context('Login', () => {

    describe('Login', () => {

        it('Should navigate to the login page', () => {

            cy.visit('https://localhost:4200')
            // Fields
            cy.getByData('username').should('be.enabled')
            cy.getByData('password').should('be.enabled')
            cy.getByData('no-robot').should('not.be.checked')
            // Buttons
            cy.getByData('forgotPassword').should('be.enabled')
            cy.getByData('login').should('be.disabled')

        })

    })

})