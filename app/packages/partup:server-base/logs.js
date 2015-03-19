var winston = Npm.require('winston');

Log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});
