// ng build

export const environment = {
    apiUrl: 'https://localhost:5001/api',
    url: 'https://localhost:5001',
    appName: {
        primary: 'ΚΡΟΤΣΗΣ',
        secondary: 'ΕΛΑΣΤΙΚΑ - ΖΑΝΤΕΣ'
    },
    clientUrl: 'https://localhost:4200',
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
        username: 'john',
        email: '',
        password: '1234567890',
        noRobot: true
    },
    production: false
}
