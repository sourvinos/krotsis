import 'cypress-localstorage-commands'

Cypress.Commands.add('login', () => {
    cy.visit('https://localhost:4200')
    cy.get('[data-cy=username]').type('john')
    cy.get('[data-cy=password]').type('ec11fc8c16db')
    cy.get('[data-cy=no-robot-label]').click()
    cy.get('[data-cy=login]').click()
})

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-cy=${selector}]`)
})