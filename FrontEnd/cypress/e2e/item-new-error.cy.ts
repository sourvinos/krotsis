import { createRandomLetters } from "../support/commands"

describe('Form invalidation', () => {

    before(() => {
        cy.initLocalStorage()
        cy.login()
        cy.saveLocalStorage()
        cy.clearSession()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Should invalidate the form and not allow save', () => {
        cy.getByDataAndClick('item-list')
        cy.getByDataAndClick('new')

        cy.getByData('description').clear().wait(1000).type(createRandomLetters(129))
        cy.getByData('vatPercent').clear().wait(1000).type('1234')
        cy.getByData('netPrice').clear().wait(1000).type('1234567.89{enter}')
        cy.getByData('grossPrice').clear().wait(1000).type('123456789.01{enter}')
        cy.getByDataAndClick('isActive')

        cy.getByData('description').should('have.class', 'ng-invalid')
        cy.getByData('vatPercent').should('have.class', 'ng-invalid')
        cy.getByData('netPrice').should('have.class', 'ng-invalid')

        cy.getByData('save').should('be.disabled')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
