Partup.helpers.pdfExtensions = ['.pdf'];
Partup.helpers.docExtensions = ['.doc', '.docx', '.rtf', '.pages', '.txt'];
Partup.helpers.presentationExtensions = ['.pps', '.ppsx', '.ppt', '.pptx'];
Partup.helpers.fallbackFileExtensions = ['.ai', '.bmp', '.eps', '.psd', '.tiff', '.tif', '.svg', '.key', '.keynote'];
Partup.helpers.imageExtensions = ['.gif', '.jpg', '.jpeg', '.png'];
Partup.helpers.spreadSheetExtensions = ['.xls', '.xlsx', '.numbers', '.csv'];
Partup.helpers.allowedExtensions = {
    images: Partup.helpers.imageExtensions,
    docs: _.flatten([
        Partup.helpers.pdfExtensions,
        Partup.helpers.docExtensions,
        Partup.helpers.presentationExtensions,
        Partup.helpers.fallbackFileExtensions
    ])
};

Partup.helpers.getAllExtensions = function () {
    return _.chain(Partup.helpers.allowedExtensions).keys().map(function (type) {
        return Partup.helpers.allowedExtensions[type];
    }).flatten().value();
};

Partup.helpers.getExtensionFromFileName = function (fileName) {
    var match = fileName.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/);
    if (match) {
        return match[0];
    }
    return _.first(Partup.helpers.docExtensions);
};

Partup.helpers.fileNameIsDoc = function (fileName) {
    return _.include(Partup.helpers.allowedExtensions.docs,
        Partup.helpers.getExtensionFromFileName(fileName)
    );
};

Partup.helpers.fileNameIsImage = function (fileName) {
    return _.include(Partup.helpers.allowedExtensions.images,
        Partup.helpers.getExtensionFromFileName(fileName)
    );
};

Partup.helpers.getSvgIcon = function (fileName) {
    var extension = Partup.helpers.getExtensionFromFileName(fileName);
    var svgFileName = 'file.svg';

    if (_.include(Partup.helpers.fallbackFileExtensions, extension)) {
        svgFileName = 'file.svg';
    }
    else if (_.include(Partup.helpers.presentationExtensions, extension)) {
        svgFileName = 'ppt.svg';
    }
    else if (_.include(Partup.helpers.docExtensions, extension)) {
        svgFileName = 'doc.svg';
    }
    else if (_.include(Partup.helpers.pdfExtensions, extension)) {
        svgFileName = 'pdf.svg';
    }
    else if (_.include(Partup.helpers.spreadSheetExtensions, extension)) {
        svgFileName = 'xls.svg';
    }

    return svgFileName;
};

// from http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
Partup.helpers.bytesToSize = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

Partup.helpers.partupUploadPhoto = function (template, mappedFile) {
    template.uploadingPhotos.set(true);
    return new Promise(function (resolve, reject) {
        Partup.client.uploader.uploadImageByUrl(mappedFile.link, function (error, image) {
            if (error) {
                Partup.client.notify.error(TAPi18n.__(error.reason));
                return reject(error);
            }
            mappedFile._id = image._id;
            resolve(mappedFile);
        });
    });
};

Partup.helpers.partupUploadDoc = function (template, mappedFile) {
    template.uploadingDocuments.set(true);
    return new Promise(function (resolve, reject) {
        resolve(mappedFile);
    });
};