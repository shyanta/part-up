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
        'splendido:accounts-meld',
        'service-configuration',
        'cfs:standard-packages',
        'tap:i18n',
        'http',
        'reywood:publish-composite'
    ], ['server']);

    api.addFiles([
        'logs.js',
        'bootstrap.js',
        'accounts.js',
        'helpers/collection.js',
        'event.js',
        'collection_hooks.js',
        'factories/updates_factory.js',
        'services/notifications_service.js',
        'event_handlers/any_handler.js',
        'event_handlers/partups/partups_handler.js',
        'event_handlers/partups/partups_supporters_handler.js',
        'event_handlers/partups/partups_name_changed_handler.js',
        'event_handlers/partups/partups_description_changed_handler.js',
        'event_handlers/partups/partups_budget_changed_handler.js',
        'event_handlers/partups/partups_location_changed_handler.js',
        'event_handlers/partups/partups_tags_changed_handler.js',
        'event_handlers/partups/partups_end_date_changed_handler.js',
        'event_handlers/partups/partups_image_changed_handler.js',
        'event_handlers/users/users_settings_handler.js',
        'event_handlers/activities/activities_handler.js',
        'fixtures.js',
        'publications/notifications.js',
        'publications/partups.js',
        'publications/images.js',
        'publications/updates.js',
        'publications/users.js',
        'methods/updates/updates_comments_methods.js',
        'methods/updates/updates_messages_methods.js',
        'methods/activities/activities_methods.js',
        'methods/activities/contributions_methods.js',
        'methods/partups/partups_methods.js',
        'methods/partups/partups_supporters_methods.js',
        'methods/users/users_methods.js',
        'methods/users/users_accounts_methods.js',
        'methods/services/flickr_methods.js',
        'methods/services/splashbase_methods.js',
        'methods/settings/settings_methods.js',
        'methods/images/images_methods.js',
        'package-tap.i18n',
        'i18n/en.i18n.json',
        'i18n/nl.i18n.json'
    ], ['server']);

    api.export('Log', ['server']);
});

Npm.depends({
    'eventemitter2': '0.4.14',
    'colors': '1.0.3',
    'deeper': '1.0.2',
    'winston': '0.9.0',
    'pluralize': '1.1.2',
    'node-flickr': '0.0.2'
});
