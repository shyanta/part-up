var stores = [];

if(Meteor.isServer && process.env.NODE_ENV == 'staging') {
    console.log('Creating Image store with S3');
    stores.push(new FS.Store.S3('original', {
        region: 'eu-west-1',
        bucket: 'pu-development'
    }));

    stores.push(new FS.Store.S3('1200x520', {
        region: 'eu-west-1',
        bucket: 'pu-development',
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(1200, 520).stream().pipe(writeStream);
        }
    }));

    stores.push(new FS.Store.S3('360x360', {
        region: 'eu-west-1',
        bucket: 'pu-development',
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(360, 360).stream().pipe(writeStream);
        }
    }));
} else {
    console.log('Creating Image store with filesystem');
    stores.push(new FS.Store.FileSystem('original', {
    }));

    stores.push(new FS.Store.FileSystem('1200x520', {
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(1200, 520).stream().pipe(writeStream);
        }
    }));

    stores.push(new FS.Store.FileSystem('360x360', {
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(360, 360).stream().pipe(writeStream);
        }
    }));
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
    insert: function (userId, document) {
        return !! userId;
    },
    update: function(userId, document) {
        return !! userId;
    },
    download: function () {
        return true;
    },
    fetch: null
});
