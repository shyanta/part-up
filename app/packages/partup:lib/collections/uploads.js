var stores = [];

if (Meteor.isServer) {
    FS.TempStore.Storage = new FS.Store.FileSystem('_tempUploadStore', {
        internal: true,
        path: process.env.CLOUD_DIR
    });

    var Store = null;
    var args = {
        'uploads': {}
    };

    if (process.env.NODE_ENV.match(/staging|acceptance|production/)) {
        console.log('Creating Upload store with S3');
        Store = FS.Store.S3;

        mout.object.deepFillIn(args, {
            'uploads': {
                //region: process.env.AWS_BUCKET_REGION,
                //bucket: process.env.AWS_BUCKET_NAME
            }
        });
    } else if (process.env.NODE_ENV.match(/development/)) {
        console.log('Creating Upload store with Filesystem');
        Store = FS.Store.FileSystem;

        mout.object.deepFillIn(args, {
            'uploads': {
                path: process.env.PWD + '/uploads'
            }
        });
    }

    if (!Store) throw new Error('A store for CFS has not been defined.');

    stores.push(new Store('uploads', args['uploads']));
} else {

    /**
     * Dummy stores so the client knows which stores are available (names)
     */
    stores.push(new FS.Store.FileSystem('uploads'));
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
        maxSize: 1000 * 1000 * 10, // 10 mb
        allow: {
            contentTypes: ['text/*']
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
    insert: function() {
        var user = Meteor.user();
        return User(user).isAdmin() || User(user).isNetworkAdmin();
    },
    remove: function() {
        var user = Meteor.user();
        return User(user).isAdmin() || User(user).isNetworkAdmin();
    },
    download: function() {
        var user = Meteor.user();
        return User(user).isAdmin() || User(user).isNetworkAdmin();
    }
});
