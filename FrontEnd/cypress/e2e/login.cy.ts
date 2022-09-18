context('Login', () => {

    describe('Login Form', () => {

        it('Should login the user', () => {

            cy.visitUrl('https://localhost:4200')

            cy.getByData('username').should('be.enabled')
            cy.getByData('password').should('be.enabled')
            cy.getByData('no-robot').should('not.be.checked')

            cy.getByData('forgotPassword').should('be.enabled')
            cy.getByData('login').should('be.disabled')

            cy.getByDataAndType('username', 'john')
            cy.getByDataAndType('password', 'ec11fc8c16db')
            cy.getByData('no-robot-label').click()
            cy.getByData('login').click()

        })

    })

})