var gm = Npm.require('gm');
var path = Npm.require('path');
var Busboy = Npm.require('busboy');

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_BUCKET_REGION;

var s3 = new AWS.S3({params: {Bucket: process.env.AWS_BUCKET_NAME}});

Router.route('/images/upload', {where: 'server'}).post(function() {
    var request = this.request;
    var response = this.response;

    var busboy = new Busboy({'headers': request.headers});

    busboy.on('file', Meteor.bindEnvironment(function(fieldname, file, filename, encoding, mimetype) {
        var extension = path.ext(filename);
        var baseFilename = path.basename(filename, extension);

        var size = 0;
        var buffers = [];

        file.on('data', Meteor.bindEnvironment(function(data) {
            size += data.length;
            buffers.push(new Buffer(data));
        }));

        file.on('end', Meteor.bindEnvironment(function() {
            var image = {
                original: {
                    type: mimetype,
                    size: size,
                    name: filename,
                    basename: baseFilename,
                    extension: extension
                }
            };

            image._id = Images.insert(image);

            var body = Buffer.concat(buffers);
            s3.putObjectSync({Key: 'images/' + filename, Body: body});

            var sizes = [{w: 100, h: 100}, {w: 101, h:101}];

            var resize = function(body, width, height, callback) {
                gm(body, 'x.jpg').resize(width, height).toBuffer('JPG', function(error, resizedBody) {
                    if (error) return callback(error);
                    return callback(null, resizedBody);
                });
            };

            var resizeSync = Meteor.wrapAsync(resize);

            sizes.forEach(function(size) {
                var directory = size.w + 'x' + size.h;
                var resizedBody = resizeSync(body, size.w, size.h);
                s3.putObjectSync({Key: directory + '/' + filename, Body: resizedBody});
            });

            response.end();
        }));
    }));

    request.pipe(busboy);
});
