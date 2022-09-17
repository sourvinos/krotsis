describe('Items List', () => {

    before(() => {
        cy.login()
        cy.saveLocalStorage()
        sessionStorage.clear()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Show items, filter them and go back', () => {
        cy.getByData('item-list').click()
        cy.getByData('row').eq(24)
        cy.getByData('filter-active').click()
        cy.getByData('row').eq(23)
        cy.getByData('filter-active').click()
        cy.getByData('row').eq(0)
        cy.getByData('filter-active').click()
        cy.getByData('row').eq(24)
        cy.getByData('home-button').click()
        cy.location('pathname').should('eq', '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
