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
        var size = 0;
        var buffers = [];

        file.on('data', Meteor.bindEnvironment(function(data) {
            size += data.length;
            buffers.push(new Buffer(data));
        }));

        file.on('end', Meteor.bindEnvironment(function() {
            var body = Buffer.concat(buffers);

            var image = {
                original: {
                    type: mimetype,
                    size: size,
                    name: filename
                }
            };

            image._id = Images.insert(image);

            s3.putObjectSync({Key: filename, Body: body});

            response.end();
        }));
    }));

    request.pipe(busboy);
});
