Package.describe({
    name: 'partup:server-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('check');
    api.use(['partup:lib'], ['server']);

    api.addFiles([
        'bootstrap.js',
        'event.js',
        'event_handlers/any_handler.js',
        'event_handlers/collections_partups_handler.js',
        'methods/collections/partups.js',
        'test.js'
    ], ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3',
    'equals': '1.0.0'
});
