var DropboxRenderer = function () {

    return {
        createPreviewLinkFromDirectLink: createPreviewLinkFromDirectLink
    };

    function getFileIdFromDirectLink(fileUrl) {
        return fileUrl.match(/view\/(\w+)/)[1];
    }

    function createPreviewLinkFromDirectLink(directLinkUrl, fileName) {
        var fileId = getFileIdFromDirectLink(directLinkUrl);
        return 'https://www.dropbox.com/s/' + fileId + '/' + fileName + '?dl=0';
    }

};

Partup.helpers.DropboxRenderer = DropboxRenderer;
