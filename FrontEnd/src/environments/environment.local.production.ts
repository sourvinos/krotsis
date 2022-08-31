// ng build --output-path="release" --configuration=local-production

export const environment = {
    apiUrl: 'https://app.krotsis.com/api',
    url: 'https://app.krotsis.com',
    appName: {
        primary: 'ΚΡΟΤΣΗΣ',
        secondary: 'ΕΛΑΣΤΙΚΑ - ΖΑΝΤΕΣ'
    },
    clientUrl: 'https://app.krotsis.com',
    defaultLanguage: 'el-GR',
    defaultTheme: 'dark',
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
        username: '',
        email: '',
        password: '',
        isHuman: false
    },
    production: true
}
