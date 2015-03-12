Package.describe({
    name: 'partup:client-partups',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles('partups.html', 'client');
    api.addFiles('partups.js', 'client');
});
