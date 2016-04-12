var DropboxRenderer = function () {

    return {
        createPreviewLinkFromDirectLink: createPreviewLinkFromDirectLink
    };

    function getFileIdFromDirectLink(fileUrl) {
        var match = fileUrl.match(/view\/(\w+)/);
        if(match) { return match[1]; }
        // return un-existing id for fallback
        return new Meteor.Collection.ObjectID()._str;
    }

    function createPreviewLinkFromDirectLink(directLinkUrl, fileName) {
        var fileId = getFileIdFromDirectLink(directLinkUrl);
        return 'https://www.dropbox.com/s/' + fileId + '/' + fileName + '?dl=0';
    }

};

Partup.helpers.DropboxRenderer = DropboxRenderer;
