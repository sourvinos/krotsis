declare namespace Cypress {

    interface Chainable<> {
        login(): any
        getByData(selector):any
    }

}