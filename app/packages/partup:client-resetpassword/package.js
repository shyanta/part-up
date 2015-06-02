Package.describe({
    name: 'partup:client-resetpassword',
    version: '0.0.1',
    summary: 'The reset password module',
    documentation: null
});

Package.onUse(function (api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'partup:lib',
        'aldeed:autoform'
    ], ['client']);

    api.addFiles([
        'package-tap.i18n',

        'Resetpassword.html',
        'Resetpassword.js',

        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ]);
});
