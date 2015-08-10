Template.AdminFeaturedPartups.onCreated(function() {
    this.subscribe('partups.public');
});

Template.AdminFeaturedPartups.helpers({
    partups: function() {
        return Partups.find({});
    },
    featuredPartups: function() {
        return Partups.find({'featured.active': true});
    },
    isFeatured: function() {
        return !!this.featured && !!this.featured.active;
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.AdminFeaturedPartups.events({
    'click [data-set-featured]': function(event, template) {
        Meteor.call('partups.feature', event.currentTarget.dataset.partupId, {active: true}, function(err) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    },
    'click [data-unset-featured]': function(event, template) {
        Meteor.call('partups.feature', event.currentTarget.dataset.partupId, {active: false}, function(err) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    }
});
