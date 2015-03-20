Package.describe({
    name: 'partup:client-widgets-dropdowns',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use(['templating'], 'client');
    api.addFiles([
      'dropdowns.js',
      'notifications/notifications.html',
      'profile/profile.html',
      'menu/menu.html',
    ], 'client');
    api.addFiles([
      'notifications/notifications.js', 
      'profile/profile.js', 
      'menu/menu.js'
    ], 'client');
});
