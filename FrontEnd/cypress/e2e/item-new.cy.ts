describe('New item', () => {

    before(() => {
        cy.initLocalStorage()
        cy.login()
        cy.saveLocalStorage()
        cy.clearSession()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('New item', () => {
        cy.getByDataAndClick('item-list')
        cy.getByDataAndClick('new')
        cy.getByDataAndType('description', 'some description')
        cy.getByDataAndType('vatPercent', '24')
        cy.getByDataAndType('netPrice', '100')
        cy.getByData('grossPrice').should('have.value', '124.00') 
        cy.getByDataAndType('grossPrice', '200')
        cy.getByData('netPrice').should('have.value', '161.29')
        cy.getByDataAndClick('save')
        cy.get('.mat-dialog-container #dialog div.success').should('exist')
        cy.get('.mat-dialog-container #dialog #dialog-footer .mat-dialog-actions #ok').click()
        cy.location('pathname').should('eq', '/items')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
