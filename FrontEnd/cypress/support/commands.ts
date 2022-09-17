import 'cypress-localstorage-commands'

Cypress.Commands.add('initLocalStorage', () => {
    localStorage.setItem('language', 'el-GR')
    localStorage.setItem('my-theme', 'dark')
})

Cypress.Commands.add('login', () => {
    cy.visitUrl('https://localhost:4200')
    cy.getByDataAndType('username', 'john')
    cy.getByDataAndType('password', 'ec11fc8c16db')
    cy.getByDataAndClick('no-robot-label')
    cy.getByDataAndClick('login')
})

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('getByDataAndHover', (selector) => {
    return cy.get(`[data-cy=${selector}]`).trigger('mouseover')
})

Cypress.Commands.add('getByDataAndClick', (selector) => {
    return cy.get(`[data-cy=${selector}]`).wait(500).click()
})

Cypress.Commands.add('getByDataAndClickNotVisible', (selector) => {
    return cy.get(`[data-cy=${selector}]`).wait(500).click({ force: true })
})

Cypress.Commands.add('getByDataAndType', (selector, text) => {
    return cy.get(`[data-cy=${selector}]`).type(text, { delay: 50 })
})

Cypress.Commands.add('visitUrl', (url) => {
    return cy.visit(url).wait(500)
})

Cypress.Commands.add('clearSession', () => {
    sessionStorage.clear()
})