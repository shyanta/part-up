Partup.helpers.imageExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.GIF', '.JPG', '.JPEG', '.PNG'];
Partup.helpers.docExtensions = ['.doc', '.docx', '.rtf', '.pages', '.txt', '.DOC', '.DOCX', '.RTF', '.PAGES', '.TXT'];
Partup.helpers.pdfExtensions = ['.pdf', '.PDF'];
Partup.helpers.presentationExtensions = ['.pps', '.ppsx', '.ppt', '.pptx', '.PPS', '.PPSX', '.PPT', '.PPTX'];
Partup.helpers.fallbackFileExtensions = ['.ai', '.bmp', '.eps', '.psd', '.tiff', '.tif', '.svg', '.key', '.keynote', '.AI', '.BMP', '.EPS', '.PSD', '.TIFF', '.TIF', '.SVG', '.KEY', '.KEYNOTE'];
Partup.helpers.spreadSheetExtensions = ['.xls', '.xlsx', '.numbers', '.csv', '.XLS', '.XLSX', '.NUMBERS', '.CSV'];

Partup.helpers.allowedExtensions = {
    images: Partup.helpers.imageExtensions,
    docs: _.flatten([
        Partup.helpers.pdfExtensions,
        Partup.helpers.docExtensions,
        Partup.helpers.presentationExtensions,
        Partup.helpers.fallbackFileExtensions,
        Partup.helpers.spreadSheetExtensions
    ])
};

Partup.helpers.getAllExtensions = function () {
    return _.chain(Partup.helpers.allowedExtensions).keys().map(function (type) {
        return Partup.helpers.allowedExtensions[type];
    }).flatten().value();
};

function matchExtension(fileName) {
    return fileName.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/);
}
Partup.helpers.getExtensionFromFileName = function (fileName) {
    var match = matchExtension(fileName);
    if (match) {
        return match[0];
    }
    // if file.name does not have .[ext] return a default doc
    return _.first(Partup.helpers.fallbackFileExtensions);
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

Partup.helpers.getSvgIcon = function (file) {
    var svgFileName = 'file.svg';

    // if there's extension in the file name
    if (matchExtension(file.name)) {
        var extension = Partup.helpers.getExtensionFromFileName(file.name);

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
        // otherwise fallback to file.svg
        return svgFileName
    } else {
        // if there's no extension in the file name,
        // for example google sheet, google docs or google slide
        // check the mimeType
        if (file.mimeType) {
            if (file.mimeType.indexOf('presentation') > -1) {
                return 'ppt.svg';
            }
            else if (file.mimeType.indexOf('document') > -1) {
                return 'doc.svg';
            }
            else if (file.mimeType.indexOf('spreadsheet') > -1) {
                return 'xls.svg';
            }
            // otherwise fallback to file.svg
            return svgFileName;
        } else {
            // otherwise fallback to file.svg
            return svgFileName;
        }
    }

};

// from http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
Partup.helpers.bytesToSize = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '';
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