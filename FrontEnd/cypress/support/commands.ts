declare module Cypress {
    interface Chainable<Subject> {
        login(): any;
    }
}

Cypress.Commands.add('login', () => {
    cy.visit('https://localhost:4200')
    cy.get('[data-cy=username]').clear().type('john')
    cy.get('[data-cy=password]').clear().type('ec11fc8c16db')
    cy.get('[data-cy=login]').wait(1200).click()
})