declare namespace Cypress {

    interface Chainable<> {
        login(): any
        getByData(selector): any
        initLocalStorage()
        clearSession()
        visitUrl(url)
        getByDataAndType(selector, text)
        getByDataAndClick(selector)
        getByDataAndHover(selector)
        getByDataAndClickNotVisible(selector)
        typeRandomChars()
    }

}