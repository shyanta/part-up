import FileUploader from './fileUploader';

FileUploader.imageExtensions = ['.gif', '.jpg'];
FileUploader.docExtensions = ['.doc', '.docx'];
FileUploader.pdfExtensions = ['.pdf', '.PDF'];
FileUploader.presentationExtensions = ['.pps', '.ppsx'];
FileUploader.fallbackFileExtensions = ['.ai', '.bmp'];
FileUploader.spreadSheetExtensions = ['.xls', '.xlsx'];

Tinytest.add('fileUploader tests', function(test) {
  test.isNotUndefined(FileUploader.allowedExtensions.docs);
  test.isNotUndefined(FileUploader.allowedExtensions.images);
});