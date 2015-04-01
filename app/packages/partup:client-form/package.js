Package.describe({
    name: 'partup:client-form',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'tap:i18n'
    ], ['client', 'server']);

    api.use([
        'templating',
        'aldeed:autoform',
        'partup:lib'
    ], 'client');

    api.addFiles([
        
        // InputTypes
        'inputTypes/boolean-checkbox/boolean-checkbox.html',
        'inputTypes/boolean-checkbox/boolean-checkbox.js',
        'inputTypes/boolean-radios/boolean-radios.html',
        'inputTypes/boolean-radios/boolean-radios.js',
        'inputTypes/boolean-select/boolean-select.html',
        'inputTypes/boolean-select/boolean-select.js',
        'inputTypes/button/button.html',
        'inputTypes/button/button.js',
        'inputTypes/color/color.html',
        'inputTypes/color/color.js',
        'inputTypes/contenteditable/contenteditable.html',
        'inputTypes/contenteditable/contenteditable.js',
        'inputTypes/date/date.html',
        'inputTypes/date/date.js',
        'inputTypes/datetime/datetime.html',
        'inputTypes/datetime/datetime.js',
        'inputTypes/datetime-local/datetime-local.html',
        'inputTypes/datetime-local/datetime-local.js',
        'inputTypes/email/email.html',
        'inputTypes/email/email.js',
        'inputTypes/file/file.html',
        'inputTypes/file/file.js',
        'inputTypes/hidden/hidden.html',
        'inputTypes/hidden/hidden.js',
        'inputTypes/image/image.html',
        'inputTypes/image/image.js',
        'inputTypes/month/month.html',
        'inputTypes/month/month.js',
        'inputTypes/number/number.html',
        'inputTypes/number/number.js',
        'inputTypes/password/password.html',
        'inputTypes/password/password.js',
        'inputTypes/radio/radio.html',
        'inputTypes/radio/radio.js',
        'inputTypes/range/range.html',
        'inputTypes/range/range.js',
        'inputTypes/reset/reset.html',
        'inputTypes/reset/reset.js',
        'inputTypes/search/search.html',
        'inputTypes/search/search.js',
        'inputTypes/select/select.html',
        'inputTypes/select/select.js',
        'inputTypes/select-checkbox/select-checkbox.html',
        'inputTypes/select-checkbox/select-checkbox.js',
        'inputTypes/select-checkbox-inline/select-checkbox-inline.html',
        'inputTypes/select-checkbox-inline/select-checkbox-inline.js',
        'inputTypes/select-multiple/select-multiple.html',
        'inputTypes/select-multiple/select-multiple.js',
        'inputTypes/select-radio/select-radio.html',
        'inputTypes/select-radio/select-radio.js',
        'inputTypes/select-radio-inline/select-radio-inline.html',
        'inputTypes/select-radio-inline/select-radio-inline.js',
        'inputTypes/submit/submit.html',
        'inputTypes/submit/submit.js',
        'inputTypes/tel/tel.html',
        'inputTypes/tel/tel.js',
        'inputTypes/text/text.html',
        'inputTypes/text/text.js',
        'inputTypes/textarea/textarea.html',
        'inputTypes/textarea/textarea.js',
        'inputTypes/time/time.html',
        'inputTypes/time/time.js',
        'inputTypes/url/url.html',
        'inputTypes/url/url.js',
        'inputTypes/week/week.html',
        'inputTypes/week/week.js',

    ], 'client');
});