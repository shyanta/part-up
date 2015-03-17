Package.describe({
    name: 'partup:client-widgets-register',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
    	'register.html',
    ], 'client');
    api.addFiles('register.js', 'client');
});
