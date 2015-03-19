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
        'mongo'
    ]);

    api.addFiles([
        'namespace.js',
        'collections/partups.js',
        'collections/notifications.js',
        'schemas/partup.js',
        'schemas/activity.js',
        'schemas/update.js',
        'schemas/tag.js',
        'schemas/network.js',
        'services/placeholder_service.js',
        'collections/fixtures.js'
        
    ]);

    api.addFiles([
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
    api.export('Notifications');
});
