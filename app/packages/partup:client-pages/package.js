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

    var clientFiles = [
        'package-tap.i18n',

        'app/app.html',
        'app/app.js',
        'app/home/home.html',
        'app/home/home.js',
        'app/discover/discover.html',
        'app/discover/discover.js',
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
        'modal/modal.html',
        'modal/modal.js',
        'modal/login/login.html',
        'modal/login/login.js',
        'modal/register/register.html',
        'modal/register/register.js',
        'modal/register/create/create.html',
        'modal/register/create/create.js',
        'modal/register/details/details.html',
        'modal/register/details/details.js',
        'modal/forgotpassword/forgotpassword.html',
        'modal/forgotpassword/forgotpassword.js',
        'modal/resetpassword/resetpassword.html',
        'modal/resetpassword/resetpassword.js',
        'modal/create_intro/create_intro.html',
        'modal/create_intro/create_intro.js',
        'modal/create/create.html',
        'modal/create/create.js',
        'modal/create/details/details.html',
        'modal/create/details/details.js',
        'modal/create/activities/activities.html',
        'modal/create/activities/activities.js',
        'modal/create/activities/adopt/adopt.html',
        'modal/create/activities/adopt/adopt.js',
        'modal/create/promote/promote.html',
        'modal/create/promote/promote.js',
    ];

    var languageFiles = [
        'i18n/app-home.en.i18n.json',
        'i18n/app-home.nl.i18n.json',
        'i18n/app-discover.en.i18n.json',
        'i18n/app-discover.nl.i18n.json',
        'i18n/app-partup-updates.en.i18n.json',
        'i18n/app-partup-updates.nl.i18n.json',
        'i18n/app-partup-updates-newmessage.en.i18n.json',
        'i18n/app-partup-updates-newmessage.nl.i18n.json',
        'i18n/app-partup-update.en.i18n.json',
        'i18n/app-partup-update.nl.i18n.json',
        'i18n/app-partup-activities.en.i18n.json',
        'i18n/app-partup-activities.nl.i18n.json',
        'i18n/modal-login.en.i18n.json',
        'i18n/modal-login.nl.i18n.json',
        'i18n/modal-register-create.en.i18n.json',
        'i18n/modal-register-create.nl.i18n.json',
        'i18n/modal-register-details.en.i18n.json',
        'i18n/modal-register-details.nl.i18n.json',
        'i18n/modal-forgotpassword.en.i18n.json',
        'i18n/modal-forgotpassword.nl.i18n.json',
        'i18n/modal-resetpassword.en.i18n.json',
        'i18n/modal-resetpassword.nl.i18n.json',
        'i18n/modal-create_intro.en.i18n.json',
        'i18n/modal-create_intro.nl.i18n.json',
        'i18n/modal-create.en.i18n.json',
        'i18n/modal-create.nl.i18n.json',
        'i18n/modal-create-details.en.i18n.json',
        'i18n/modal-create-details.nl.i18n.json',
        'i18n/modal-create-activities.en.i18n.json',
        'i18n/modal-create-activities.nl.i18n.json',
        'i18n/modal-create-promote.en.i18n.json',
        'i18n/modal-create-promote.nl.i18n.json',
    ];

    api.addFiles(clientFiles.concat(languageFiles), 'client');

    var serverFiles = [
        'package-tap.i18n'
    ];

    api.addFiles(serverFiles.concat(languageFiles), 'server');
});
