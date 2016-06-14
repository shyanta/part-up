var appName = 'Part-up';
var contextName = '';
var defaultDelimiter = '' - '';
var notificationsCount = 0;
var windowTitle = '';

var composeWindowTitle = function () {
    if (notificationsCount > 0) {
        windowTitle = '(' + notificationsCount + ') ' + appName;
    } else {
        windowTitle = appName + '';
    }

    if (contextName !== '') {
        if (windowTitle === '') {
            windowTitle = contextName;
        } else {
            windowTitle = windowTitle + defaultDelimiter + contextName;
        }
    }
    document.title = windowTitle;
};

var setNotificationsCount = function (notificationsCountIn) {
    notificationsCount = notificationsCountIn;
    composeWindowTitle();
};

var setContextName = function (contextNameIn) {
    contextName = contextNameIn;
    composeWindowTitle();
};

composeWindowTitle();

Partup.client.windowTitle = {
    setNotificationsCount: setNotificationsCount,
    setContextName: setContextName
};