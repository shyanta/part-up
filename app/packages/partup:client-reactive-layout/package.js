Package.describe({
    name: 'partup:client-reactive-layout',
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
        'ReactiveLayout.html',
        'ReactiveLayout.js',

        'ReactiveTile.html',
        'ReactiveTile.js'
    ], 'client');
});
