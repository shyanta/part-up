Package.describe({
    name: 'partup:client-widgets-startcontribute',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function (api) {
    api.use([
        'templating',
        'aldeed:autoform',
        'partup:lib',
        'tap:i18n',
        'reactive-var'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'WidgetStartContributePlaceholders.js',
        'WidgetStartContribute.html',
        'WidgetStartContribute.js',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');
});