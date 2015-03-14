Package.describe({
    name: 'partup:server-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['partup:lib'], ['server']);

    api.addFiles([
        'bootstrap.js',
        'helpers.js',
        'event_listeners/any.js',
        'event_listeners/collections_partups.js',
        'methods/collections/partups.js',
        'test.js'
    ], ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3'
});
