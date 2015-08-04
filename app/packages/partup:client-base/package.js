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

        'client/base-64-polyfill.js',
        // 'client/placeholder-polyfill.js',
        'client/requestanimationframe-polyfill.js',

        'namespace.js',
        'autoform/partup/inputTypes/boolean-checkbox/boolean-checkbox.html',
        'autoform/afFieldInput.js',
        'client/error.js',
        'client/isMobile.js',
        'client/events.js',
        'client/debug.js',
        'client/socials.js',
        'client/notify.js',
        'client/language.js',
        'client/strings.js',
        'client/clipboard.js',
        'client/forms.js',
        'client/spinner.js',
        'client/elements.js',
        'client/popup.js',
        'client/uploader.js',
        'client/focuslayer.js',
        'client/datepicker.js',
        'client/reactivedate.js',
        'client/reactiveVarHelpers.js',
        'client/grid.js',
        'client/scroll.js',
        'client/screensize.js',
        'client/moment.js',
        'client/updates.js',
        'client/discover.js',
        'client/prompt.js',
        'client/window.js',
        'client/url.js',
        'helpers/log.js',
        'helpers/dateFormatters.js',
        'helpers/datepicker.js',
        'helpers/equality.js',
        'helpers/forms.js',
        'helpers/imageUrl.js',
        'helpers/loading.js',
        'helpers/Partup.js',
        'helpers/isPopupActive.js',
        'helpers/footerToggle.js',
        'helpers/async.html',
        'helpers/async.js',
        'helpers/newlineToBreak.js',
        'helpers/onrendered.js',
        'helpers/tagsQuerySearch.js',
        'helpers/currentUserId.js',
        'bootstrap.js',

        'i18n/helpers-dateFormatters.en.i18n.json',
        'i18n/helpers-dateFormatters.nl.i18n.json',
        'i18n/client-language.en.i18n.json',
        'i18n/client-language.nl.i18n.json'
    ], ['client']);

    api.addFiles([
        'package-tap.i18n',
        'i18n/helpers-dateFormatters.en.i18n.json',
        'i18n/helpers-dateFormatters.nl.i18n.json',
        'i18n/client-language.en.i18n.json',
        'i18n/client-language.nl.i18n.json'
    ], 'server');
});
