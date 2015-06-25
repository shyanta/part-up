Package.describe({
    name: 'partup:client-network-settings-requests',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n',
        'partup:lib'
    ], ['client', 'server']);

    api.use([
        'templating'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        'NetworkSettingsRequests.html',
        'NetworkSettingsRequests.js',

        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'server');
});
