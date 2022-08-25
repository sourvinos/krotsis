// ng build

export const environment = {
    apiUrl: 'https://localhost:5001/api',
    url: 'https://localhost:5001',
    appName: {
        primary: 'krotsis',
        secondary: 'ΕΛΑΣΤΙΚΑ - ΖΑΝΤΕΣ'
    },
    clientUrl: 'https://localhost:4200',
    defaultLanguage: 'en-GB',
    defaultTheme: 'light',
    idleSettings: {
        admins: {
            idle: 840,
            timeout: 60
        },
        simpleUsers: {
            idle: 60,
            timeout: 60
        }
    },
    iconsDirectory: 'assets/images/icons/',
    isWideScreen: 1920,
    login: {
        username: 'john',
        email: 'johnsourvinos@hotmail.com',
        password: 'ec11fc8c16db',
        isHuman: true
    },
    production: false
}
