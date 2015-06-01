Package.describe({
    name: 'partup:client-pages',
    version: '0.0.1',
    summary: 'All pages',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'partup:lib',
        'reactive-dict',
        'reactive-var',
        'aldeed:autoform',
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        // All pages
        'app/app.html',
        'app/app.js',
        'app/home/home.html',
        'app/home/home.js',
        'app/partup/partup.html',
        'app/partup/partup.js',
        'app/partup/updates/updates.html',
        'app/partup/updates/updates.js',
        'app/partup/updates/newmessage/newmessage.html',
        'app/partup/updates/newmessage/newmessage.js',
        'app/partup/update/update.html',
        'app/partup/update/update.js',
        'app/partup/activities/activities.html',
        'app/partup/activities/activities.js',

        'i18n/app-home.en.i18n.json',
        'i18n/app-home.nl.i18n.json',
        'i18n/app-partup-updates.en.i18n.json',
        'i18n/app-partup-updates.nl.i18n.json',
        'i18n/app-partup-updates-newmessage.en.i18n.json',
        'i18n/app-partup-updates-newmessage.nl.i18n.json',
        'i18n/app-partup-update.en.i18n.json',
        'i18n/app-partup-update.nl.i18n.json',
        'i18n/app-partup-activities.en.i18n.json',
        'i18n/app-partup-activities.nl.i18n.json',
    ], 'client');

    api.addFiles([
        'package-tap.i18n',

        'i18n/app-home.en.i18n.json',
        'i18n/app-home.nl.i18n.json',
        'i18n/app-partup-updates.en.i18n.json',
        'i18n/app-partup-updates.nl.i18n.json',
        'i18n/app-partup-updates-newmessage.en.i18n.json',
        'i18n/app-partup-updates-newmessage.nl.i18n.json',
        'i18n/app-partup-update.en.i18n.json',
        'i18n/app-partup-update.nl.i18n.json',
        'i18n/app-partup-activities.en.i18n.json',
        'i18n/app-partup-activities.nl.i18n.json',
    ], 'server');
});