Package.describe({
    name: 'partup:client-base',
    version: '0.0.1',
    summary: ''
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'partup:lib',
        'momentjs:moment',
        'chrismbeckett:toastr',
        'templating',
        'tracker',
        'reactive-var',
        'reactive-dict'
    ], ['client']);

    api.addFiles([
        'package-tap.i18n',

        'namespace.js',
        'autoform/partup/inputTypes/boolean-checkbox/boolean-checkbox.html',
        'autoform/afFieldInput.js',
        'ui/socials.js',
        'ui/notify.js',
        'ui/language.js',
        'ui/strings.js',
        'ui/clipboard.js',
        'ui/forms.js',
        'ui/spinner.js',
        'ui/intent.js',
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
        'autorun.js',
        'bootstrap.js',

        'i18n/helpers-dateFormatters.en.i18n.json',
        'i18n/helpers-dateFormatters.nl.i18n.json'
    ], ['client']);

    api.addFiles([
        'package-tap.i18n',
        'i18n/helpers-dateFormatters.en.i18n.json',
        'i18n/helpers-dateFormatters.nl.i18n.json'
    ], 'server');
});
