Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['mongo']);

    api.addFiles([
        'collections/partups.js'
        'namespace.js',
    ]);

    api.export('Partups');
    api.export('Partup');
});