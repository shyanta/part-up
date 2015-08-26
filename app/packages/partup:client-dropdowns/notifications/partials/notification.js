Template.Notification.helpers({
    '': function() {
        //...
    }
});
Template.Notification.events({
    'click [data-notification]': function(event, template) {
        template.dropdownOpen.set(false);
        var notificationId = $(event.currentTarget).data('notification');
        Meteor.call('notifications.clicked', notificationId, function(error, response) {

        });
    }
});
