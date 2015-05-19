Package.describe({
    name: 'partup:client-base',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});

Package.onUse(function (api) {
    api.use('check');

    api.use([
        'partup:lib',
        'tap:i18n',
        'momentjs:moment',
        'chrismbeckett:toastr',
        'templating',
        'tracker',
        'reactive-var',
        'reactive-dict'
    ], ['client']);

    api.addFiles([
        'namespace.js',
        'autoform/partup/inputTypes/boolean-checkbox/boolean-checkbox.html',
        'ui/socials.js',
        'ui/notify.js',
        'ui/language.js',
        'ui/strings.js',
        'ui/clipboard.js',
        'ui/forms.js',
        'ui/spinner.js',
        'ui/modal.js',
        'ui/elements.js',
        'ui/popup.js',
        'ui/uploader.js',
        'ui/focuslayer.js',
        'helpers/dateFormatters.js',
        'helpers/datepicker.js',
        'helpers/equality.js',
        'helpers/scrollBottom.js',
        'helpers/forms.js',
        'helpers/imageById.js',
        'helpers/loading.js',
        'helpers/Partup.js',
        'autorun.js'
    ], ['client']);
});
