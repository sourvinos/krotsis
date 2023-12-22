// ng build --output-path="release" --configuration=production-live

export const environment = {
    apiUrl: '',
    url: '',
    appName: 'Krotsis',
    clientUrl: '',
    defaultLanguage: 'el-GR',
    dialogShieldsDirectory: 'assets/images/dialog-shields',
    featuresIconDirectory: 'assets/images/features/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    portStopOrdersDirectory: 'assets/images/port-stop-orders/',
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
