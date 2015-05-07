/**
 @namespace Partup notifications factory
 @name Partup.factories.notificationsFactory
 @memberOf partup.factories
 */
Partup.factories.notificationsFactory = {

    /**
     * Make a new notification
     *
     * @param  {int} userId
     * @param  {string} notificationType
     * @param  {mixed} notificationTypeData
     *
     * @return {Update}
     */
    make: function(userId, notificationType, notificationTypeData) {
        var notification = { };

        if (! userId) throw new Meteor.Error(500, 'Required argument [userId] is missing for method [Partup.factories.notificationsFactory::make]');
        if (! notificationType) throw new Meteor.Error(500, 'Required argument [notificationType] is missing for method [Partup.factories.notificationsFactory::make]');
        if (! notificationTypeData) throw new Meteor.Error(500, 'Required argument [notificationTypeData] is missing for method [Partup.factories.notificationsFactory::make]');

        notification.for_upper_id = userId;
        notification.type = notificationType;
        notification.type_data = notificationTypeData;
        notification.created_at = new Date();
        notification.new = true;

        return notification;
    }

};
