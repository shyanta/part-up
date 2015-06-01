Package.describe({
    name: 'partup:client-widgets-dropdowns',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'templating',
        'partup:lib',
        'reactive-var'
    ], 'client');

    api.addFiles([
        'dropdowns.js',

        'notifications/notifications.html',
        'notifications/notifications.js',

        'profile/profile.html',
        'profile/profile.js',

        'partials/updates-actions/updates-actions.html',
        'partials/updates-actions/updates-actions.js',
        'partials/activities-actions/activities-actions.html',
        'partials/activities-actions/activities-actions.js'
    ], 'client');
});
