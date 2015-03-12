Package.describe({
    name: 'partup:client-start',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
    	'start.html',
    	'progress.html',
    	'details.html',
    ], 'client');
    api.addFiles('start.js', 'client');
});
