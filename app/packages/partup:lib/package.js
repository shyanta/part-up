Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('aldeed:simple-schema');
    api.use('mongo');

    api.addFiles([
        'namespace.js',
        'collections/partups.js',
        'schemas/partup_schema.js'
    ]);

    api.addFiles([
        'publishes/partups.js'
    ], 'server');

    api.export('Partups');
    api.export('Partup');
});