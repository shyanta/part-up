Package.describe({
    name: 'partup:client-widgets-startactivities',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function (api) {
    api.use([
        'templating',
        'aldeed:autoform',
        'partup:lib',
        'partup:client-utils',
        'tap:i18n'
    ], 'client');

    api.addFiles([
        'package-tap.i18n',
        'WidgetStartActivitiesPlaceholders.js',
        'WidgetStartActivities.html',
        'WidgetStartActivities.js',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');
});