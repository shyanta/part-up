Package.describe({
    name: 'partup:client-partup-tile',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'templating',
        'partup:lib'
    ], 'client');

    api.addFiles([
        'PartupTile.html',
        'PartupTile.js'
    ], 'client');
});
