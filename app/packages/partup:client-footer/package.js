Package.describe({
    name: 'partup:client-footer',
    version: '0.0.1',
    summary: 'Responsive black app footer',
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

        'Footer.html',
        'Footer.js',

        'i18n/footer.en.i18n.json',
        'i18n/footer.nl.i18n.json'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'i18n/footer.en.i18n.json',
        'i18n/footer.nl.i18n.json'
    ], 'server');
});
