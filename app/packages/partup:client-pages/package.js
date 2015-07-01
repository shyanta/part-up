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

        // App
        'app/app.html',
        'app/app.js',
        'app/app-header.html',
        'app/app-header.js',
        'app/app-footer.html',

        // App:home
        'app/home/home.html',
        'app/home/home.js',

        // App:discover
        'app/discover/discover.html',
        'app/discover/discover.js',

        // App:network
        'app/network/networks-overview-temp.html',
        'app/network/networks-overview-temp.js',
        'app/network/network.html',
        'app/network/network.js',

        // App:partup
        'app/partup/partup.html',
        'app/partup/partup.js',
        'app/partup/partup-navigation.html',
        'app/partup/partup-navigation.js',
        'app/partup/partup-sidebar.html',
        'app/partup/partup-sidebar.js',

        // App:partup:takepart (modal)
        'app/partup/takepart/takepart.html',
        'app/partup/takepart/takepart.js',

        // App:partup:updates
        'app/partup/updates/updates.html',
        'app/partup/updates/updates.js',
        'app/partup/updates/newmessage/newmessage.html',
        'app/partup/updates/newmessage/newmessage.js',
        'app/partup/update/update.html',
        'app/partup/update/update.js',

        // App:partup:activities
        'app/partup/activities/activities.html',
        'app/partup/activities/activities.js',

        // Modal
        'modal/modal.html',
        'modal/modal.js',

        // Modal:login
        'modal/login/login.html',
        'modal/login/login.js',

        // Modal:register
        'modal/register/register.html',
        'modal/register/register.js',
        'modal/register/signup/signup.html',
        'modal/register/signup/signup.js',
        'modal/register/details/details.html',
        'modal/register/details/details.js',

        // Modal:forgot/resetpasword
        'modal/forgotpassword/forgotpassword.html',
        'modal/forgotpassword/forgotpassword.js',
        'modal/resetpassword/resetpassword.html',
        'modal/resetpassword/resetpassword.js',

        // Modal:partup_settings
        'modal/partup_settings/partup_settings.html',
        'modal/partup_settings/partup_settings.js',

        // Modal:invite_to_partup
        'modal/invite_to_partup/invite_to_partup.html',
        'modal/invite_to_partup/invite_to_partup.js',

        // Modal:network
        'modal/network/create_network/create_network.html',
        'modal/network/create_network/create_network.js',

        // Modal:network_settings
        'modal/network_settings/network_settings.html',
        'modal/network_settings/details/details.html',
        'modal/network_settings/uppers/uppers.html',

        // Modal:create_intro
        'modal/create_intro/create_intro.html',
        'modal/create_intro/create_intro.js',

        // Modal:create
        'modal/create/create.html',
        'modal/create/create.js',

        // Modal:create:details
        'modal/create/details/details.html',
        'modal/create/details/details.js',

        // Modal:create:activities
        'modal/create/activities/activities.html',
        'modal/create/activities/activities.js',
        'modal/create/activities/copy/copy.html',
        'modal/create/activities/copy/copy.js',

        // Modal:create:promote
        'modal/create/promote/promote.html',
        'modal/create/promote/promote.js',
    ];

    var languageFiles = [
        'i18n/app.en.i18n.json',
        'i18n/app.nl.i18n.json',
        'i18n/app-home.en.i18n.json',
        'i18n/app-home.nl.i18n.json',
        'i18n/app-discover.en.i18n.json',
        'i18n/app-discover.nl.i18n.json',
        'i18n/app-partup.en.i18n.json',
        'i18n/app-partup.nl.i18n.json',
        'i18n/app-partup-takepart.en.i18n.json',
        'i18n/app-partup-takepart.nl.i18n.json',
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
        'i18n/modal-register-signup.en.i18n.json',
        'i18n/modal-register-signup.nl.i18n.json',
        'i18n/modal-register-details.en.i18n.json',
        'i18n/modal-register-details.nl.i18n.json',
        'i18n/modal-forgotpassword.en.i18n.json',
        'i18n/modal-forgotpassword.nl.i18n.json',
        'i18n/modal-resetpassword.en.i18n.json',
        'i18n/modal-resetpassword.nl.i18n.json',
        'i18n/modal-invite_to_partup.en.i18n.json',
        'i18n/modal-invite_to_partup.nl.i18n.json',
        'i18n/modal-partup_settings.en.i18n.json',
        'i18n/modal-partup_settings.nl.i18n.json',
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
        'i18n/modal-network_settings.en.i18n.json',
        'i18n/modal-network_settings.nl.i18n.json',
    ];

    api.addFiles(clientFiles.concat(languageFiles), 'client');

    var serverFiles = [
        'package-tap.i18n'
    ];

    api.addFiles(serverFiles.concat(languageFiles), 'server');
});
