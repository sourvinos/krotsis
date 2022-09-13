describe('Item List', () => {

    before(() => {
        cy.login()
    })

    it('Should show a list of items', () => {
        cy.get('[data-cy=item-list]').click()
    })
})