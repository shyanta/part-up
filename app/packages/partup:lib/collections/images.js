var stores = [];

if (Meteor.isServer) {
    console.log('Creating Image store with GridFS');

    stores.push(new FS.Store.GridFS('original', {
        region: process.env.AWS_BUCKET_REGION,
        bucket: process.env.AWS_BUCKET_NAME
    }));

    stores.push(new FS.Store.GridFS('1200x520', {
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(1200, 520).stream().pipe(writeStream);
        }
    }));

    stores.push(new FS.Store.GridFS('360x360', {
        transformWrite: function (image, readStream, writeStream) {
            gm(readStream, image.name()).resize(360, 360).stream().pipe(writeStream);
        }
    }));
} else {
    stores.push(new FS.Store.GridFS('original'));
    stores.push(new FS.Store.GridFS('1200x520'));
    stores.push(new FS.Store.GridFS('360x360'));
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
