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
        'schemas/partup_schema.js',
        'services/placeholder_service.js',
        'collections/fixtures.js'
    ]);

    api.addFiles([
        'publications/partups.js'
    ], 'server');

    api.export('Partups');
    api.export('Partup');
});