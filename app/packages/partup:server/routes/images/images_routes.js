var path = Npm.require('path');
var Busboy = Npm.require('busboy');

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_BUCKET_REGION;

var MAX_FILE_SIZE = 1000 * 1000 * 10; // 10 MB

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

            var body = Buffer.concat(buffers);
            var image = Partup.server.services.images.upload(filename, body, mimetype);

            return response.end(JSON.stringify({error: false, image: image._id}));
        }));
    }));

    request.pipe(busboy);
});
