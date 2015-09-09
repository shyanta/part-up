var path = Meteor.isServer ? process.env.TEMP_DIR : '/tmp';
var stores = [
    new FS.Store.FileSystem('default', {
        // internal: true,
        path: path
    })
];

/**
 * Images are entities stored under each object that contains one or more images
 *
 * @namespace Images
 * @memberOf Collection
 */
Temp = new FS.Collection('temp', {
    stores: stores,
    filter: {
        maxSize: 1024 * 1024 * 20, // 20 mb
        allow: {
            contentTypes: ['text/csv']
        },
        deny: {
            contentTypes: []
        }
    },
    onInvalid: function(message) {
        if (Meteor.isClient) {
            Partup.client.notify.error(__('temp-error_' + message));
        } else {
            //backend error handling
        }
    }
});

// Allow validators
Temp.allow({
    insert: function(userId, document) {
        return true;
    },
    update: function(userId, document) {
        return true;
    }
});
