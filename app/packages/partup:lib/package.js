Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'aldeed:simple-schema',
        'aldeed:autoform',
        'comerc:autoform-fixtures',
        'mongo',
        'chrismbeckett:toastr'
    ]);

    api.addFiles([
        'namespace.js',
        'collections/activities.js',
        'collections/fixtures.js',
        'collections/notifications.js',
        'collections/partups.js',
        'notify/notify.js',
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
        'notify/notify.js',
        'ui/dropdown.js'
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
});
