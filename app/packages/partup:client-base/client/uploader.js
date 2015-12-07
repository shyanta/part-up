// Settings
//
var MAX_IMAGE_WIDTH = 1500;
var MAX_IMAGE_HEIGHT = 1500;

Partup.client.uploader = {

    /**
     * Upload single image
     *
     * @memberOf Partup.client
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');
        var self = this;

        var IE = this.isIE();

        var userId = Meteor.userId();
        // TODO: Error if user is not loggedin
        // console.log(file);
        if (IE) {
            var reader = new mOxie.FileReader();
        } else {
            var reader = new FileReader();
        }
        console.log('created reader');
        reader.onload = function(e) {
            console.log('reader loaded');
            img.src = e.target.result;
        };
        // console.log(reader)
        reader.readAsDataURL(file);


        img.onload = function() {
            console.log('image loaded');
            var width = img.naturalWidth;
            var height = img.naturalHeight;

            if (width > height) {
                if (width > MAX_IMAGE_WIDTH) {
                    height *= MAX_IMAGE_WIDTH / width;
                    width = MAX_IMAGE_WIDTH;
                }
            } else {
                if (height > MAX_IMAGE_HEIGHT) {
                    width *= MAX_IMAGE_HEIGHT / height;
                    height = MAX_IMAGE_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            var dataUrl;
            if (img.src.indexOf('image/png') > -1) {
                dataUrl = canvas.toDataURL('image/png');
            } else {
                dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            }

            var resizedFile = self.dataURLToBlob(dataUrl);

            if (IE) {

                resizedFile.name = file.name;
                var newFile = new mOxie.File(null, resizedFile);
            } else {
                var newFile = new File([resizedFile], file.name);
            }
            console.log('created file');

            var token = Accounts._storedLoginToken();
            if (IE) {
                var xhr = new mOxie.XMLHttpRequest();
                // xhr.responseType = 'blob';
            } else {
                var xhr = new XMLHttpRequest();
            }
            console.log('created xhr');
            var url = Meteor.absoluteUrl() + 'images/upload?token=' + token;
            // var url = 'https://3a99bcc0.ngrok.io/images/upload?token=' + token;
            console.log(url);
            xhr.open('POST', url, true);

            if (IE) {
                var formData = new mOxie.FormData();
            } else {
                var formData = new FormData();
            }
            console.log('created formdata');
            formData.append('file', newFile);

            // return
            xhr.addEventListener('load', function() {
                console.log(xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                console.log(data)
                // if (data.error) {
                //     callback(data.error);
                // }

                Meteor.subscribe('images.one', data.image);
                Meteor.autorun(function(computation) {
                    var image = Images.findOne({_id: data.image});
                    if (image) {
                        computation.stop();
                        Tracker.nonreactive(function() {
                            callback(null, image);
                        });
                    }
                });

            });
            xhr.addEventListener('error', function() {
                console.log(xhr.responseText)
                for (var i = 0; i < arguments.length; i++) {

                    console.log(JSON.stringify(arguments[i]))
                };
            });

            xhr.send(formData);
        };
    },

    /**
     * Return a blob from dataurl
     *
     * @memberOf Partup.client
     * @param {DataUrl} canvas dataurl
     */

    dataURLToBlob: function(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);

            return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    },

    /**
     * Loop through each file in a file input select event
     *
     * @memberOf Partup.client
     * @param {Object} fileSelectEvent
     * @param {Function} callback
     */
    eachFile: function(fileSelectEvent, callBack) {
        var e = (fileSelectEvent.originalEvent || fileSelectEvent);
        var files = e.target.files;

        if (!files || files.length === 0) {
            files = e.dataTransfer ? e.dataTransfer.files : [];
        }

        for (var i = 0; i < files.length; i++) {
            callBack(files[i]);
        }
    },

    /**
     * Upload single image by url
     *
     * @memberOf Partup.client
     * @param {String} url
     * @param {Function} callback
     */
    uploadImageByUrl: function(url, callback) {
        Meteor.call('images.insertByUrl', url, function(error, result) {
            if (error || !result) return callback(error);

            Meteor.subscribe('images.one', result._id, function() {
                Meteor.autorun(function(computation) {
                    var image = Images.findOne({_id: result._id});
                    if (image) {
                        computation.stop();
                        Tracker.nonreactive(function() {
                            callback(null, image);
                        });
                    }
                });
            });
        });
    },

    create: function(options) {
        var buttonElement = options.buttonElement || null;
        var fileInput = options.fileInput || null;
        var isIE = this.isIE();
        if (isIE) {
            fileInput = new mOxie.FileInput({
                browse_button: buttonElement, // or document.getElementById('file-picker')
                accept: [
                    {title: 'Image files', extensions: 'jpg,gif,png'} // accept only images
                ],
                multiple: true, // allow multiple file selection
                runtime_order: 'flash,silverlight,html5',
            });
            fileInput.onchange = function(event) {
                console.log('changed input')
                options.onFileChange(event);
            };
            buttonElement.addEventListener('click', function(event) {
                console.log('button clicked')
                event.preventDefault();
            })
            fileInput.init(); // initialize q
        } else {
            buttonElement.addEventListener('click', function(event) {
                console.log('click')
                $(fileInput).click();
            });
            fileInput.addEventListener('change', function(event) {
                options.onFileChange(event);
            });
        }

    },

    isIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        }

        if (/Edge\/12./i.test(navigator.userAgent)){
           // this is Microsoft Edge
           return true;
        }

       return true;
    }

};
