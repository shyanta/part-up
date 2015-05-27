Package.describe({
    name: 'partup:client-widgets-focuspoint',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function (api) {
    api.use([
        'templating',
        'lifely:focuspoint'
    ], ['client']);

    api.addFiles([
        'WidgetFocuspoint.html',
        'WidgetFocuspoint.js'
    ], 'client');
});
