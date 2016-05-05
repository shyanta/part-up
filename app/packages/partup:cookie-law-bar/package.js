Package.describe({
    name: 'partup:cookie-law-bar',
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
        'CookieLawBar.html',
        'CookieLawBar.js'
    ], 'client');

});
