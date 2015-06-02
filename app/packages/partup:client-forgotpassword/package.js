Package.describe({
    name: 'partup:client-forgotpassword',
    version: '0.0.1',
    summary: 'The forgot password module',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'partup:lib',
        'aldeed:autoform',
        'reactive-var'
    ], ['client']);

    api.addFiles([
        'package-tap.i18n',

        'Forgotpassword.html',
        'Forgotpassword.js',

        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ]);
});
