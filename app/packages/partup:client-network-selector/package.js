Package.describe({
    name: 'partup:client-network-selector',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'meteorhacks:subs-manager'
    ], ['client', 'server']);

    api.use([
        'templating',
        'partup:lib'
    ], 'client');

    api.addFiles([
        'NetworkSelector.html',
        'NetworkSelector.js',
    ], 'client');
});
