Package.describe({
    name: 'partup:client-form',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'aldeed:autoform',
        'partup:lib',
        'reactive-dict'
    ], 'client');

    api.addFiles([

        'fieldStates.js'

    ], 'client');
});