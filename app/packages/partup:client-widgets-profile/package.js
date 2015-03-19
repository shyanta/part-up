Package.describe({
    name: 'partup:client-widgets-profile',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
      'profile.html',
    ], 'client');
    api.addFiles('profile.js', 'client');
});
