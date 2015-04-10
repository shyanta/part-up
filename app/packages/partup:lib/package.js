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
        'partup:copy-to-clipboard',
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
        'collections/activities.js',
        'collections/contributions.js',
        'collections/updates.js',
        'collections/notifications.js',
        'collections/partups.js',
        'collections/images.js',
        'schemas/activity.js',
        'schemas/contribution.js',
        'schemas/forgotPassword.js',
        'schemas/login.js',
        'schemas/network.js',
        'schemas/partup.js',
        'schemas/register.js',
        'schemas/resetPassword.js',
        'schemas/tag.js',
        'schemas/update.js',
        'transformers/activity.js',
        'transformers/partup.js',
        'transformers/user.js',
        'transformers/contributions.js',
    ]);

    // Namespace
    api.export('Partup');

    // Collections
    api.export('Partups');
    api.export('Activities');
    api.export('Contributions');
    api.export('Notifications');
    api.export('Images');
    api.export('Updates');
});
