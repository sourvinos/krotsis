// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://krotsis-001-site1.etempurl.com/api',
    url: 'http://krotsis-001-site1.etempurl.com',
    appName: 'Krotsis',
    clientUrl: 'http://krotsis-001-site1.etempurl.com',
    defaultLanguage: 'el-GR',
    dialogShieldsDirectory: 'assets/images/dialog-shields',
    featuresIconDirectory: 'assets/images/features/',
    logoDirectory: 'assets/images/logo/',
    cssUserSelect: 'auto',
    minWidth: 1280,
    login: {
        username: '',
        email: '',
        password: '',
        noRobot: false
    },
    production: true
}
