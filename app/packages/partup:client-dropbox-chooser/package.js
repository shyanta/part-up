Package.describe({
    name: 'partup:client-dropbox-chooser',
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

        'dropins.min.js',
        'dropbox.min.js',

        'DropboxChooser.html',
        'DropboxChooser.ctrl.js'

    ], 'client');

});
