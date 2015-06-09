Package.describe({
    name: 'partup:client-partup-tile',
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
        'partup:lib'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        'PartupTile.html',
        'PartupTile.js',

        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');
});
