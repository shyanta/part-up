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
        'partup:lib',
        'tap:i18n',
        'momentjs:moment',
        'chrismbeckett:toastr',
        'templating'
    ], ['client']);

    api.addFiles([
        'namespace.js',
        'bootstrap.js',
        'notify/notify.js',
        'helpers/dateFormatters.js',
        'helpers/equality.js'
    ], ['client']);
});
