var DropboxRenderer = function () {

    return {
        getFileIdFromDirectLink: getFileIdFromDirectLink,
        createPreviewLinkFromDirectLink: createPreviewLinkFromDirectLink,
        getSvgIcon: Partup.helpers.getSvgIcon,
        bytesToSize: Partup.helpers.bytesToSize
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
