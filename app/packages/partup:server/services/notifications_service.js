var d = Debug('services:notifications');

// partups_supporters_added
// partup_activities_invited
// partups_contributions_accepted
// partups_contributions_rejected
// partups_networks_invited
// partups_networks_accepted
// contributions_ratings_inserted
// updates_first_comment

/**
 @namespace Partup server notifications service
 @name Partup.server.services.notifications
 @memberof Partup.server.services
 */
Partup.server.services.notifications = {

    /**
     * Make a new notification
     *
     * @param  {object} options
     *
     * @return {Update}
     */
    send: function(options) {
        var options = options || {};
        var notification = {};

        if (!options.userId) throw new Meteor.Error('Required argument [options.userId] is missing for method [Partup.server.services.notifications::send]');
        if (!options.type) throw new Meteor.Error('Required argument [options.type] is missing for method [Partup.server.services.notifications::send]');
        if (!options.typeData) throw new Meteor.Error('Required argument [options.typeData] is missing for method [Partup.server.services.notifications::send]');

        notification.for_upper_id = options.userId;
        notification.type = options.type;
        notification.type_data = options.typeData;
        notification.created_at = new Date();
        notification.new = true;
        notification.clicked = false;

        d('Notification created for user [' + notification.for_upper_id + '] with type [' + notification.type + ']');

        Notifications.insert(notification);
    }

};
