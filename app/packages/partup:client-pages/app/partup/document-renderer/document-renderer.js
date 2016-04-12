Template.DocumentRenderer.helpers({
    getSvgIcon: Partup.helpers.getSvgIcon,
    bytesToSize: Partup.helpers.bytesToSize,
    previewLink: function(file) {
        return Partup.helpers.DropboxRenderer().createPreviewLinkFromDirectLink(file.link, file.name);
    }
});