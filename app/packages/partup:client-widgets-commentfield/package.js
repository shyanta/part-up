Package.describe({
    name: 'partup:client-widgets-commentfield',
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
        'partup:lib',
        'tracker',
        'reactive-dict',
        'aldeed:autoform'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        'WidgetCommentFieldPlaceholders.js',
        'WidgetCommentField.html',
        'WidgetCommentField.js',

        'i18n/common.en.i18n.json',
        'i18n/common.nl.i18n.json',
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        
        'i18n/common.en.i18n.json',
        'i18n/common.nl.i18n.json',
    ], 'server');
});
