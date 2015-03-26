Package.describe({
    name: 'partup:client-widgets-partuptile',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function (api) {
    api.use([
        'templating',
        'partup:lib'
    ], 'client');

    api.addFiles([
        'WidgetPartuptile.html',
        'WidgetPartuptile.js'
    ], 'client');
});