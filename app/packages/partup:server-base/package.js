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
        'partup:lib'
    ], ['server']);

    api.addFiles([
        'logs.js',
        'bootstrap.js',
        'helpers/collection.js',
        'event.js',
        'event_handlers/any_handler.js',
        'event_handlers/collections/partups/partups_handler.js',
        'event_handlers/collections/partups/partups_supporters_handler.js',
        'methods/collections/partups/partups_methods.js',
        'methods/collections/partups/partups_supporters_methods.js',
        'test.js'
    ], ['server']);

    api.export('Log', ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3',
    'equals': '1.0.0',
    'winston': '0.9.0',
    'pluralize': '1.1.2'
});
