Template.app_profile.onCreated(function() {
    var template = this;
    template.profileSubscription = template.subscribe('users.one', template.data.profileId);
    template.autorun(function whenSubscriptionIsReady(computation) {
        if (template.profileSubscription.ready()) {
            computation.stop();
            if (!Meteor.users.findOne({_id: template.data.profileId})) {
                Router.pageNotFound('profile');
            }
        }
    });
    template.autorun(function() {
        var scrolled = Partup.client.scroll.pos.get() > 100;
        if (scrolled) {
            if (template.view.isRendered) template.toggleExpandedText(true);
        }
    });
    template.toggleExpandedText = function(hide) {
        var clickedElement = $('[data-expand]');
        var parentElement = $(clickedElement[0].parentElement);

        var collapsedText = __(clickedElement.data('collapsed-key')) || false;
        var expandedText = __(clickedElement.data('expanded-key')) || false;

        if (parentElement.hasClass('pu-state-open')) {
            if (collapsedText) clickedElement.html(collapsedText);
        } else {
            if (expandedText) clickedElement.html(expandedText);
        }
        if (hide) {
            if (collapsedText) clickedElement.html(collapsedText);
            parentElement.removeClass('pu-state-open');
            clickedElement.parents('.pu-sub-pageheader').removeClass('pu-state-descriptionexpanded');
        } else {
            parentElement.toggleClass('pu-state-open');
            clickedElement.parents('.pu-sub-pageheader').toggleClass('pu-state-descriptionexpanded');
        }
    };
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_profile.helpers({
    profile: function() {
        var user = Meteor.users.findOne(this.profileId);
        profile = user.profile;
        profile.participation_score = User(user).getReadableScore();
        return profile;
    },

    getRoundedScore: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getReadableScore();
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
        template.toggleExpandedText();
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
