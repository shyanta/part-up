Package.describe({
    name: 'partup:intro',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles('partup:intro.html');
    api.addFiles('partup:intro.js');
});
