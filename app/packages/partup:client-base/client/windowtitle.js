<<<<<<< HEAD
/**
 * Window Title function for global use
 *
 * @class window-title
 * @memberof Partup.client
 */


Partup.client.windowTitle = (function() {

  var appName,
  contextName,
  defaultDelimiter,
  isDisplayName,
  notificationsCount,
  windowTitle = "";

  init = function () {
    appName = "Part-up";
    contextName = "";
    isDisplayName = true;
    defaultDelimiter = " - ";
    notificationsCount = 0;
    windowTitle = "";

    composeWindowTitle();
  },
  setAppName = function(isDisplayIn, nameIn) {
    	names[numberIn] = nameIn;

      composeWindowTitle();
  },
  setNotificationsCount = function(notificationsCountIn) {
    notificationsCount = notificationsCountIn;

    composeWindowTitle();
  	return;
  },
  setContextName = function(contextNameIn) {
  	contextName = contextNameIn;

    composeWindowTitle();
  	return;
  },
  composeWindowTitle = function() {
    if (notificationsCount > 0) {
        windowTitle = '(' + notificationsCount + ') ' + appName;
    } else {
        windowTitle = appName + "";
    }

    if (contextName !== "") {

      if (windowTitle == "") {
        windowTitle = contextName;
      } else {
        windowTitle = windowTitle + defaultDelimiter + contextName;
      }

    }

    document.title = windowTitle;
    return;
  };
  return {
  	init: init,
    setAppName: setAppName,
    setNotificationsCount: setNotificationsCount,
    setContextName: setContextName
  };
}());

Partup.client.windowTitle.init();
=======
var appName = 'Part-up';
var contextName = '';
var defaultDelimiter = ' - ';
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
>>>>>>> develop
