Package.describe({
    name: 'partup:server-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('check');

    api.use([
        'mongo',
        'partup:lib',
        'accounts-base',
        'service-configuration',
        'cfs:standard-packages'
    ], ['server']);

    api.addFiles([
        'logs.js',
        'bootstrap.js',
        'accounts.js',
        'helpers/collection.js',
        'event.js',
        'collection-hooks.js',
        'event_handlers/any_handler.js',
        'event_handlers/partups/partups_handler.js',
        'event_handlers/partups/partups_supporters_handler.js',
        'event_handlers/partups/partups_name_changed_handler.js',
        'event_handlers/partups/partups_description_changed_handler.js',
        'event_handlers/partups/partups_tags_changed_handler.js',
        'event_handlers/partups/partups_end_date_changed_handler.js',
        'event_handlers/users/users_settings_handler.js',
        'publications/notifications.js',
        'publications/partups.js',
        'publications/images.js',
        'publications/users.js',
        'methods/updates/updates_comments_methods.js',
        'methods/activities/activities_methods.js',
        'methods/activities/contributions_methods.js',
        'methods/partups/partups_methods.js',
        'methods/partups/partups_supporters_methods.js',
        'methods/users/users_methods.js',
        'fixtures.js'
    ], ['server']);

    api.export('Log', ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3',
    'deeper': '1.0.2',
    'winston': '0.9.0',
    'pluralize': '1.1.2'
});
