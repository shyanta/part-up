// @TODO Needs to be enhanced, but at least this works
/**
 * Uploads collection
 *
 * @namespace Uploads
 * @memberOf Collection
 */
Uploads = new FS.Collection('uploads', {
    stores: [
        new FS.Store.FileSystem(
            'uploads', {
                path: '/tmp/uploads/csv'
            }
        )
    ]
});

Uploads.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    download: function() {
        return true;
    }
});
