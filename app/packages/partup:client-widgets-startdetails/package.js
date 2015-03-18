Package.describe({
    name: 'partup:client-widgets-startdetails',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
    	'startdetails.html'
    ], 'client');
    api.addFiles('startdetails.js', 'client');
});
