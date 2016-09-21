Package.describe({
    name: 'partup-client-network-settings-access',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'partup-lib'
    ], ['client', 'server']);

    api.use([
        'templating',
    ], 'client');

    api.addFiles([

        'NetworkSettingsAccess.html',
        'NetworkSettingsAccess.js'

    ], 'client');

});
