Package.describe({
    name: 'partup:client-widgets-loader',
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
        'WidgetLoader.html'
    ], 'client');
});