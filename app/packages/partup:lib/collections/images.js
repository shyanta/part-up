var stores = [];

FS.config.uploadChunkSize = 1024 * 1024 * 100;

if (Meteor.isServer) {
    var os = require('os');

    FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore_' + os.hostname(), {
        internal: true,
        path: process.env.CLOUD_DIR
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
        },
        '32x32': {
            transformWrite: function(image, readStream, writeStream) {
                gm(readStream, image.name()).resize(32, 32).stream().pipe(writeStream);
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
            },
            '32x32': {
                region: process.env.AWS_BUCKET_REGION,
                bucket: process.env.AWS_BUCKET_NAME,
                folder: '32x32'
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
            },
            '32x32': {
                path: process.env.PWD + '/uploads/32x32'
            }
        });
    }

    if (!Store) throw new Error('A store for CFS has not been defined.');

    stores.push(new Store('original', args.original));
    stores.push(new Store('1200x520', args['1200x520']));
    stores.push(new Store('360x360', args['360x360']));
    stores.push(new Store('80x80', args['80x80']));
    stores.push(new Store('32x32', args['32x32']));
} else {

    /**
     * Dummy stores so the client knows which stores are available (names)
     */
    stores.push(new FS.Store.FileSystem('original'));
    stores.push(new FS.Store.FileSystem('1200x520'));
    stores.push(new FS.Store.FileSystem('360x360'));
    stores.push(new FS.Store.FileSystem('80x80'));
    stores.push(new FS.Store.FileSystem('32x32'));
}

/**
 * Images are entities stored under each object that contains one or more images
 *
 * @namespace Images
 * @memberOf Collection
 */
Images = new FS.Collection('images', {
    stores: stores,
    filter: {
        maxSize: 1000 * 1000 * 2, // 2 mb
        allow: {
            contentTypes: ['image/*']
        },
        deny: {
            contentTypes: ['image/gif']
        }
    },
    onInvalid: function(message) {
        if (Meteor.isClient) {
            Partup.client.notify.error(__('images-error_' + message));
        } else {
            //backend error handling
        }
    }
});

/**
 * Find the images for a partup
 *
 * @memberOf Images
 * @param {Partup} partup
 * @return {Mongo.Cursor}
 */
Images.findForPartup = function(partup) {
    return Images.find({_id: partup.image}, {limit: 1});
};

/**
 * Find the images for a user
 *
 * @memberOf Images
 * @param {User} user
 * @return {Mongo.Cursor}
 */
Images.findForUser = function(user) {
    return Images.find({_id: user.profile.image}, {limit: 1});
};

/**
 * Find the images for a network
 *
 * @memberOf Images
 * @param {Network} network
 * @return {Mongo.Cursor}
 */
Images.findForNetwork = function(network) {
    return Images.find({_id: {'$in': [network.image, network.icon, get(network, 'featured.logo')]}}, {limit: 2});
};

/**
 * Find the images for a notification
 *
 * @memberOf Images
 * @param {Notification} notification
 * @return {Mongo.Cursor}
 */
Images.findForNotification = function(notification) {
    var images = [];

    switch (notification.type) {
        case 'partups_messages_inserted':
        case 'partups_activities_inserted':
        case 'partups_contributions_inserted':
        case 'partups_contributions_proposed': images = [get(notification, 'type_data.creator.image')]; break;
        case 'partups_networks_accepted':
        case 'partups_networks_invited': images = [get(notification, 'type_data.network.image'), get(notification, 'type_data.inviter.image')]; break;
        case 'partups_networks_new_pending_upper': images = [get(notification, 'type_data.pending_upper.image')]; break;
        case 'partups_supporters_added': images = [get(notification, 'type_data.supporter.image')]; break;
        case 'partup_activities_invited': images = [get(notification, 'type_data.inviter.image')]; break;
        case 'partups_contributions_accepted': images = [get(notification, 'type_data.accepter.image')]; break;
        case 'partups_contributions_rejected': images = [get(notification, 'type_data.rejecter.image')]; break;
        case 'partups_user_mentioned': images = [get(notification, 'type_data.mentioning_upper.image')]; break;
        case 'contributions_ratings_inserted': images = [get(notification, 'type_data.rater.image')]; break;
        case 'updates_first_comment': images = [get(notification, 'type_data.commenter.image')]; break;
        default: return;
    }

    return Images.find({_id: {'$in': images}});
};

/**
 * Find images for an update
 *
 * @memberOf Images
 * @param {Update} update
 * @return {Mongo.Cursor}
 */
Images.findForUpdate = function(update) {
    var images = [];

    switch (update.type) {
        case 'partups_image_changed': images = [update.type_data.old_image, update.type_data.new_image]; break;
        case 'partups_message_added': images = update.type_data.images || []; break;
        default: return;
    }

    return Images.find({_id: {'$in': images}});
};

Images.allow({
    insert: function(userId, document) {
        return !!userId;
    },
    download: function() {
        return true;
    }
});
