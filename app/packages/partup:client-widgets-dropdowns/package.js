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
    ], 'client');

    api.use([
        'tap:i18n'
    ], ['client', 'server']);


    api.addFiles([
        'package-tap.i18n',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'server');

    api.addFiles([
        'package-tap.i18n',

        'dropdowns.js',

        'notifications/notifications-placeholders.js',
        'notifications/notifications.html',
        'notifications/notifications.js', 

        'profile/profile-placeholders.js', 
        'profile/profile.html',
        'profile/profile.js', 

        'menu/menu-placeholders.js',
        'menu/menu.html',
        'menu/menu.js',

        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], 'client');
});
