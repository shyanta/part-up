Package.describe({
    name: 'partup:client-columns-layout',
    version: '0.0.1',
    summary: 'a pinterest-like layout for overview pages'
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'reactive-var'
    ], 'client');

    api.addFiles([
        'Columnslayout.html',
        'Columnslayout.js',

        'subtemplates/Tile.html',
        'subtemplates/Tile.js'
    ], 'client');
});
