var gm = Npm.require('gm');
var path = Npm.require('path');
var Busboy = Npm.require('busboy');

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_BUCKET_REGION;

var MAX_FILE_SIZE = 1000 * 1000 * 10; // 10 MB

var s3 = new AWS.S3({params: {Bucket: process.env.AWS_BUCKET_NAME}});

Router.route('/images/upload', {where: 'server'}).post(function() {
    var request = this.request;
    var response = this.response;

    response.setHeader('Content-Type', 'application/json');

    // TODO: Authorisation, see https://github.com/CollectionFS/Meteor-http-methods/blob/master/README.md#authentication
    // - Client: Send token parameters with POST request
    // - Server: Find user in database using the given token
    //      https://github.com/CollectionFS/Meteor-http-methods/blob/master/http.methods.server.api.js#L173

    var busboy = new Busboy({'headers': request.headers});

    busboy.on('file', Meteor.bindEnvironment(function(fieldname, file, filename, encoding, mimetype) {
        var extension = path.extname(filename);

        if (!(/\.(jpg|jpeg|png)$/i).test(extension)) {
            response.statusCode = 400;
            // TODO: Improve error message (i18n)
            response.end(JSON.stringify({error: 'Image is invalid'}));
            return;
        }

        var baseFilename = path.basename(filename, extension);

        var size = 0;
        var buffers = [];

        file.on('data', Meteor.bindEnvironment(function(data) {
            size += data.length;
            buffers.push(new Buffer(data));
        }));

        file.on('end', Meteor.bindEnvironment(function() {
            if (size > MAX_FILE_SIZE) {
                response.statusCode = 400;
                // TODO: Improve error message (i18n)
                response.end(JSON.stringify({error: 'Image is too large'}));
                return;
            }

            var filename = Random.id() + extension;

            var image = {
                _id: Random.id(),
                name: filename,
                type: mimetype,
                copies: {},
                createdAt: new Date()
            };

            var filekey = image._id + '-' + filename;

            // TODO (extra): Add .autoOrient() to gm calls

            var body = Buffer.concat(buffers);
            s3.putObjectSync({Key: 'images/' + filekey, Body: body, ContentType: mimetype});
            image.copies['original'] = {key: 'images/' + filekey, size: body.length};

            var sizes = [{w:32, h:32}, {w:80, h:80}, {w:360, h:360}, {w:1200, h:520}];

            var resize = function(filename, body, width, height, callback) {
                gm(body, filename).resize(width, height).toBuffer(function(error, resizedBody) {
                    if (error) return callback(error);
                    return callback(null, resizedBody);
                });
            };

            var resizeSync = Meteor.wrapAsync(resize);

            sizes.forEach(function(size) {
                var directory = size.w + 'x' + size.h;
                var resizedBody = resizeSync(filename, body, size.w, size.h);
                image.copies[directory] = {key: directory + '/' + filekey, size: resizedBody.length};
                s3.putObjectSync({Key: directory + '/' + filekey, Body: resizedBody, ContentType: mimetype});
            });

            Images.insert(image);

            return response.end(JSON.stringify({error: false, image: image._id}));
        }));
    }));

    request.pipe(busboy);
});
