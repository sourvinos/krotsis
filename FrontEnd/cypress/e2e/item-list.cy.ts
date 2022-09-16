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
        cy.get('[data-cy=item-list]').click()
        cy.get('[data-cy=row]').eq(24)
        cy.get('[data-cy=filter-active]').click()
        cy.get('[data-cy=row]').eq(23)
        cy.get('[data-cy=filter-active]').click()
        cy.get('[data-cy=row]').eq(0)
        cy.get('[data-cy=filter-active]').click()
        cy.get('[data-cy=row]').eq(24)
        cy.get('[data-cy=home-button]').click()
        cy.location('pathname').should('eq', '/')
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

})
