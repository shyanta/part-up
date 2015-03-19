Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('aldeed:simple-schema');
    api.use('aldeed:autoform');
    api.use('comerc:autoform-fixtures');
    api.use('mongo');

    api.addFiles([
        'namespace.js',
        'collections/partups.js',
        'schemas/partup_schema.js',
        'services/placeholder_service.js'
    ]);

    api.addFiles([
        'publications/partups.js',
        'collections/fixtures.js'
    ], 'server');

    api.export('Partups');
    api.export('Partup');
});