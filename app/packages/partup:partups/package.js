Package.describe({
    name: 'partup:partups',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles('partup:partups.html');
    api.addFiles('partup:partups.js');
});
