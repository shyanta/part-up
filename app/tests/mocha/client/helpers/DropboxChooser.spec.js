if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        var expect = chai.expect;
        var assert = chai.assert;

        var allowedExtensions = {
            images: ['.jpg', '.png'],
            docs: ['.doc', '.docx', '.pdf']
        };

        var dropbox = new Partup.helpers.DropboxChooser({
            allowedExtensions: allowedExtensions
        });

        var dropboxFile = {

          // Name of the file.
          name: "filename.txt",

          // URL to access the file, which varies depending on the linkType specified when the
          // Chooser was triggered.
          link: "https://...",

          // Size of the file in bytes.
          bytes: 464,

          // URL to a 64x64px icon for the file based on the file's extension.
          icon: "https://...",

          // A thumbnail URL generated when the user selects images and videos.
          // If the user didn't select an image or video, no thumbnail will be included.
          thumbnailLink: "https://...?bounding_box=75&mode=fit",

          // Boolean, whether or not the file is actually a directory
          isDir: false
       };


        describe.only("Partup.helpers.DropboxChooser", function(){
            it('should have allowedExtensions as an instance options', function() {
                expect(dropbox.options.allowedExtensions).to.eql(allowedExtensions);
            });

            it('should get all extensions as an array with values', function() {
                expect(dropbox.getAllExtensions())
                .to.eql([".jpg", ".png", ".doc", ".docx", ".pdf"])
            });

            it('should get the extension type by fileName', function() {
                expect(dropbox.getExtensionFromFileName(
                    dropboxFile.name
                )).to.eql('.txt');
            });
        });
    });
}
