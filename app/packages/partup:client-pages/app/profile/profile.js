Template.app_profile.onCreated(function() {
    var template = this;
    template.profileSubscription = template.subscribe('users.one', template.data.profileId);
    Meteor.autorun(function whenSubscriptionIsReady(computation) {
        if (template.profileSubscription.ready()) {
            computation.stop();
            if (!Meteor.users.findOne({_id: template.data.profileId})) {
                Router.pageNotFound('profile');
            }
        }
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_profile.helpers({
    profile: function() {
        return Meteor.users.findOne(this.profileId).profile;
    },

    subscriptionsReady: function() {
        return Template.instance().profileSubscription.ready();
    },

    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 100;
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_profile.events({
    'click [data-expand]': function(event, template) {
        var clickedElement = $(event.target);
        var parentElement = $(event.target.parentElement);

        var collapsedText = __(clickedElement.data('collapsed-key')) || false;
        var expandedText = __(clickedElement.data('expanded-key')) || false;

        if (parentElement.hasClass('pu-state-open')) {
            if (collapsedText) clickedElement.html(collapsedText);
        } else {
            if (expandedText) clickedElement.html(expandedText);
        }

        $(event.target.parentElement).toggleClass('pu-state-open');
        $(event.target).parents('.pu-sub-pageheader').toggleClass('pu-state-profiledescriptionexpanded');
    }
});
