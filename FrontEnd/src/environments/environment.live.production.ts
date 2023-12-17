// ng build --output-path="release" --configuration=live-production

export const environment = {
    apiUrl: 'http://krotsis-001-site1.etempurl.com/api',
    url: 'http://krotsis-001-site1.etempurl.com',
    appName: {
        primary: 'ΚΡΟΤΣΗΣ',
        secondary: 'ΕΛΑΣΤΙΚΑ - ΖΑΝΤΕΣ'
    },
    clientUrl: 'http://krotsis-001-site1.etempurl.com',
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
        noRobot: false
    },
    production: true
}
