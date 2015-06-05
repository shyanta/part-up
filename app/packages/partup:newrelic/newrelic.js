if (process.env.NODE_ENV !== 'development') {
    Newrelic = Npm.require('newrelic');
}
