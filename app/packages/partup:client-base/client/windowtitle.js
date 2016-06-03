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
    contextName = ""
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
    if (notificationCount > 0) {
        windowTitle = '(' + notificationCount + ') ' + appName;
    } else {
        windowTitle = appName;
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
