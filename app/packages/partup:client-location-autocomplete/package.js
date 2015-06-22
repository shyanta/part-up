Package.describe({
    name: 'partup:client-location-autocomplete',
    version: '0.0.1',
    summary: '',
    documentation: null
});

Package.onUse(function(api) {
    api.use([
        'templating',
        'partup:lib'
    ], 'client');

    api.addFiles([
        'LocationAutocomplete.html',
        'LocationAutocomplete.js'
    ], 'client');
});
