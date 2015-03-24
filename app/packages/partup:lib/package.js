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
        'tracker',
        'aldeed:simple-schema',
        'aldeed:autoform',
        'comerc:autoform-fixtures',
        'chrismbeckett:toastr',
        'cfs:standard-packages',
        'cfs:s3',
        'cfs:filesystem',
        'cfs:graphicsmagick',
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
        'autorun.js',
        'ui/dropdown.js'
    ], 'client');

    api.addFiles([
        'publications/notifications.js',
        'publications/partups.js',
        'publications/images.js',
        'publications/users.js'
    ], 'server');

    // Namespace
    api.export('Partup');

    // Collections
    api.export('Partups');
    api.export('Activities');
    api.export('Notifications');
    api.export('Images');
});
