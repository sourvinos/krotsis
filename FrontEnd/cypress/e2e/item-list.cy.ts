describe('Items List', () => {

    before(() => {
        cy.initLocalStorage()
        cy.login()
        cy.saveLocalStorage()
        cy.clearSession()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    it('Should show items, filter them, exit and logout', () => {
        cy.getByDataAndClick('item-list')
        cy.getByData('row').eq(24)
        cy.getByDataAndClick('filter-active')
        cy.getByData('row').eq(23)
        cy.getByDataAndClick('filter-active')
        cy.getByData('row').eq(0)
        cy.getByDataAndClick('filter-active')
        cy.getByData('row').eq(24)
        cy.getByDataAndClick('home-button')
        cy.location('pathname').should('eq', '/')
        cy.getByDataAndHover('user-menu')
        cy.getByDataAndClickNotVisible('logout')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
