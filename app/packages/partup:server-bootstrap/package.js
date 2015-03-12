Package.describe({
    name: 'partup:server-bootstrap',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.addFiles('config/services.js');
});
