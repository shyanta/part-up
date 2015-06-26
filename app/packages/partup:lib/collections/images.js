var stores = [];

if (Meteor.isServer) {

    FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore', {
        internal: true,
        path: process.env.TEMP_DIR
    });

    var Store = null;
    var args = {
        'original': {},
        '1200x520': {
            transformWrite: function(image, readStream, writeStream) {
                gm(readStream, image.name()).resize(1200, 520).stream().pipe(writeStream);
            }
        },
        '360x360': {
            transformWrite: function(image, readStream, writeStream) {
                gm(readStream, image.name()).resize(360, 360).stream().pipe(writeStream);
            }
        },
        '80x80': {
            transformWrite: function(image, readStream, writeStream) {
                gm(readStream, image.name()).resize(80, 80).stream().pipe(writeStream);
            }
        }
    };

    if (process.env.NODE_ENV.match(/staging|acceptance|production/)) {
        console.log('Creating Image store with S3');
        Store = FS.Store.S3;

        mout.object.deepFillIn(args, {
            'original': {
                region: process.env.AWS_BUCKET_REGION,
                bucket: process.env.AWS_BUCKET_NAME
            },
            '1200x520': {
                region: process.env.AWS_BUCKET_REGION,
                bucket: process.env.AWS_BUCKET_NAME,
                folder: '1200x520'
            },
            '360x360': {
                region: process.env.AWS_BUCKET_REGION,
                bucket: process.env.AWS_BUCKET_NAME,
                folder: '360x360'
            },
            '80x80': {
                region: process.env.AWS_BUCKET_REGION,
                bucket: process.env.AWS_BUCKET_NAME,
                folder: '80x80'
            }
        });
    } else if (process.env.NODE_ENV.match(/development/)) {
        console.log('Creating Image store with Filesystem');
        Store = FS.Store.FileSystem;

        mout.object.deepFillIn(args, {
            'original': {
                path: process.env.PWD + '/uploads'
            },
            '1200x520': {
                path: process.env.PWD + '/uploads/1200x520'
            },
            '360x360': {
                path: process.env.PWD + '/uploads/360x360'
            },
            '80x80': {
                path: process.env.PWD + '/uploads/80x80'
            }
        });
    }

    if (!Store) throw new Error('A store for CFS has not been defined.');

    stores.push(new Store('original', args['original']));
    stores.push(new Store('1200x520', args['1200x520']));
    stores.push(new Store('360x360', args['360x360']));
    stores.push(new Store('80x80', args['80x80']));
} else {

    /**
     * Dummy stores so the client knows which stores are available (names)
     */
    stores.push(new FS.Store.FileSystem('original'));
    stores.push(new FS.Store.FileSystem('1200x520'));
    stores.push(new FS.Store.FileSystem('360x360'));
    stores.push(new FS.Store.FileSystem('80x80'));
}

Images = new FS.Collection('images', {
    stores: stores,
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Images.allow({
    insert: function(userId, document) {
        return !!userId;
    },
    download: function() {
        return true;
    }
});
