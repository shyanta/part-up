Package.describe({
    name: 'partup:client-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use('check');

    api.use([
        'tap:i18n',
        'momentjs:moment'
    ], ['client']);

    api.addFiles([
        'bootstrap.js'
    ], ['client']);
});
