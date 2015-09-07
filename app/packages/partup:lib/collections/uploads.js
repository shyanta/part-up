var stores = [];

FS.config.uploadChunkSize = 1024 * 1024 * 100;

if (Meteor.isServer) {
    FS.TempStore.Storage = new FS.Store.FileSystem('_tempUploadStore', {
        internal: true,
        path: process.env.CLOUD_DIR
    });

    var Store = null;
    var args = {
        'uploads': {},
        'csv': {}
    };

    if (process.env.NODE_ENV.match(/staging|acceptance|production/)) {
        console.log('Creating Upload store with S3');
        Store = FS.Store.S3;

        mout.object.deepFillIn(args, {
            'uploads': {
                //region: process.env.AWS_BUCKET_REGION,
                //bucket: process.env.AWS_BUCKET_NAME
            },
            'csv': {
                //region: process.env.AWS_BUCKET_REGION,
                //bucket: process.env.AWS_BUCKET_NAME,
                folder: 'csv'
            }
        });
    } else if (process.env.NODE_ENV.match(/development/)) {
        console.log('Creating Upload store with Filesystem');
        Store = FS.Store.FileSystem;

        mout.object.deepFillIn(args, {
            'uploads': {
                path: process.env.PWD + '/uploads'
            },
            'csv': {
                path: process.env.PWD + '/uploads/csv'
            }
        });
    }

    if (!Store) throw new Error('A store for CFS has not been defined.');

    stores.push(new Store('uploads', args['uploads']));
    stores.push(new Store('csv', args['csv']));
} else {

    /**
     * Dummy stores so the client knows which stores are available (names)
     */
    stores.push(new FS.Store.FileSystem('uploads'));
    stores.push(new FS.Store.FileSystem('csv'));
}

/**
 * Uploads are entities stored under each object that contains an uploaded file
 *
 * @namespace Uploads
 * @memberOf Collection
 */
Uploads = new FS.Collection('uploads', {
    stores: stores,
    filter: {
        maxSize: 1000 * 1000 * 5, // 5 mb
        allow: {
            contentTypes: ['upload/*']
        },
        deny: {
            contentTypes: ['upload/gif']
        }
    },
    onInvalid: function(message) {
        if (Meteor.isClient) {
            Partup.client.notify.error(__('uploads-error_' + message));
        } else {
            //backend error handling
        }
    }
});

Uploads.allow({
    insert: function(userId, document) {
        return !!userId;
    },
    remove: function() {
        return true;
    },
    download: function() {
        return true;
    }
});
