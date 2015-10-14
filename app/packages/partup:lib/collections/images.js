/**
 * Images are entities stored under each object that contains one or more images
 *
 * @namespace Images
 * @memberOf Collection
 */
Images = new Meteor.Collection('images');

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
        case 'invite_upper_to_partup': images = [get(notification, 'type_data.inviter.image')]; break;
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
    }
});
