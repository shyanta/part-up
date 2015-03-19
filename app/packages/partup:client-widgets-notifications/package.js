Package.describe({
    name: 'partup:client-widgets-notifications',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
      'notifications.html',
    ], 'client');
    api.addFiles('notifications.js', 'client');
});
