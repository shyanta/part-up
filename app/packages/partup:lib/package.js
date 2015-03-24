Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'mongo',
        'aldeed:simple-schema',
        'aldeed:autoform',
        'comerc:autoform-fixtures',
        'cfs:standard-packages',
        'momentjs:moment',
        'tap:i18n'
    ]);

    api.use([
        'templating'
    ], 'client');

    api.addFiles([
        'namespace.js',
        'collections/activities.js',
        'collections/fixtures.js',
        'collections/notifications.js',
        'collections/partups.js',
        'collections/images.js',
        'schemas/activity.js',
        'schemas/network.js',
        'schemas/partup.js',
        'schemas/register.js',
        'schemas/tag.js',
        'schemas/update.js',
        'services/partup.js',
        'services/placeholder.js',
        'transformers/partup.js'
    ]);

    api.addFiles([
        'ui/dropdown.js',
        'ui/dateFormatters.js',
        'ui/helpers.js'
    ], 'client');

    api.addFiles([
        'publications/notifications.js',
        'publications/partups.js'
    ], 'server');

    // Namespace
    api.export('Partup');

    // Collections
    api.export('Partups');
    api.export('Activities');
    api.export('Notifications');
    api.export('Images');
});
