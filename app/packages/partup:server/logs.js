var winston = Npm.require('winston');

var transports = [];

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'acceptance') {
    transports.push(new (winston.transports.Console)({level: 'debug', prettyPrint: true, colorize: true, debugStdout: true}));
}

if (process.env.NODE_ENV === 'production') {
    transports.push(new (winston.transports.Console)({level: 'warn'}));
}

Log = new (winston.Logger)({transports: transports});
