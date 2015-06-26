Package.describe({
    name: 'partup:lib',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'mongo',
        'tracker',
        'aldeed:simple-schema',
        'aldeed:autoform',
        'chrismbeckett:toastr',
        'cfs:standard-packages',
        'cfs:s3',
        'cfs:gridfs',
        'cfs:graphicsmagick',
        'momentjs:moment',
        'tap:i18n',
        'matb33:collection-hooks',
        'partup:client-copy-to-clipboard',
        'lifely:mout'
    ]);

    api.use([
        'templating'
    ], 'client');

    api.addFiles([
        'namespace.js',
        'services/location.js',
        'services/placeholder.js',
        'services/tags.js',
        'services/validators.js',
        'services/website.js',
        'collections/activities.js',
        'collections/contributions.js',
        'collections/updates.js',
        'collections/notifications.js',
        'collections/partups.js',
        'collections/images.js',
        'collections/ratings.js',
        'collections/networks.js',
        'collections/users.js',
        'collections/tags.js',
        'schemas/activity.js',
        'schemas/contribution.js',
        'schemas/forgotPassword.js',
        'schemas/login.js',
        'schemas/network.js',
        'schemas/partup.js',
        'schemas/register.js',
        'schemas/resetPassword.js',
        'schemas/settings.js',
        'schemas/tag.js',
        'schemas/update.js',
        'schemas/newMessage.js',
        'schemas/inviteUpper.js',
        'schemas/rating.js',
        'transformers/activity.js',
        'transformers/partup.js',
        'transformers/user.js',
        'transformers/update.js',
        'transformers/contributions.js',
        'transformers/network.js',
        'helpers/parselocale.js'
    ]);

    api.addFiles([
        'startup/default_profile_pictures.js'
    ], ['server']);

    for (var i = 1; i <= 15; i++) {
        api.addFiles('private/default_profile_pictures/Profielfoto' + i + '.png', 'server', {isAsset: true});
    }

    // Namespace
    api.export('Partup');

    // Collections
    api.export('Partups');
    api.export('Activities');
    api.export('Contributions');
    api.export('Notifications');
    api.export('Networks');
    api.export('Images');
    api.export('Updates');
    api.export('Ratings');
    api.export('Tags');
});
