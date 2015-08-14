Package.describe({
    name: 'partup:client-header',
    version: '0.0.1',
    summary: 'Responsive blue app header',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'partup:lib',
        'reactive-var'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        'Header.html',
        'Header.js',

        'templates/logo.html',

        'templates/nav.html',
        'templates/nav.js',
        'templates/personal.html',
        'templates/personal.js',

        'i18n/header.en.i18n.json',
        'i18n/header.nl.i18n.json'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'i18n/header.en.i18n.json',
        'i18n/header.nl.i18n.json'
    ], 'server');
});
