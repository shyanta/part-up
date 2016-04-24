Template.DocumentRenderer.helpers({
    getSvgIcon: Partup.helpers.getSvgIcon,
    bytesToSize: Partup.helpers.bytesToSize,
    previewLink: function(file) {
        var client = new URL(file.link).host;

        if(client.indexOf('dropbox') > -1) {
            return Partup.helpers.DropboxRenderer().createPreviewLinkFromDirectLink(file.link, file.name);
        }
        else if(client.indexOf('google') > -1) {
            return Partup.helpers.GoogleDriveRenderer().createPreviewLinkFromDirectLink(file.link);
        }
        else { /* perhaps partup 404 no file found */ return ''; }
    }
});