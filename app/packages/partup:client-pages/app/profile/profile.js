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
        var user = Meteor.users.findOne(this.profileId);
        profile = user.profile;
        profile.participation_score = User(user).getReadableScore();
        if (user.profile.website) profile.website = Partup.client.url.getCleanUrl(user.profile.website);
        return profile;
    },

    subscriptionsReady: function() {
        return Template.instance().profileSubscription.ready();
    },

    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 100;
    },

    isCurrentusersProfile: function() {
        return this.profileId === Meteor.userId();
    },
    textHasOverflown: function() {
        var template = Template.instance();
        var rendered = template.partupTemplateIsRendered.get();
        if (!rendered) return;
        var expander = $(template.find('[data-expander-parent]'));
        if (expander.length && expander[0].scrollHeight > expander.innerHeight()) return true;
        return false;
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
        $(event.target).parents('.pu-sub-pageheader').toggleClass('pu-state-descriptionexpanded');
    },
    'click [data-open-profilesettings]': function(event, template) {
        Intent.go({
            route: 'profile-settings',
            params: {
                _id: template.data.profileId
            }
        });
    },
    'click [data-location]': function(event, template) {
        var location = Meteor.users.findOne(template.data.profileId).profile.location;
        Session.set('discover.location', location);
        Router.go('discover');
    }
});
