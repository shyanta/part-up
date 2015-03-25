Package.describe({
    name: 'partup:server-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('check');

    api.use([
        'mongo',
        'partup:lib',
        'accounts-base',
        'service-configuration'
    ], ['server']);

    api.addFiles([
        'logs.js',
        'bootstrap.js',
        'accounts.js',
        'helpers/collection.js',
        'event.js',
        'event_handlers/any_handler.js',
        'event_handlers/partups/partups_handler.js',
        'event_handlers/partups/partups_supporters_handler.js',
        'methods/activities/activities_methods.js',
        'methods/partups/partups_methods.js',
        'methods/partups/partups_supporters_methods.js',
        'methods/users/users_methods.js',
        'fixtures.js'
    ], ['server']);

    api.export('Log', ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3',
    'deeper': '1.0.2',
    'winston': '0.9.0',
    'pluralize': '1.1.2'
});
