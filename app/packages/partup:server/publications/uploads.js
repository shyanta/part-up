/**
 * Publish an uploaded file
 *
 * @param {String} uploadId
 */
Meteor.publish('uploads.one', function(uploadId) {
    check(uploadId, String);

    this.unblock();

    return Uploads.find({_id: uploadId}, {limit: 1});
});
