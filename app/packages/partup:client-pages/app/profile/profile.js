var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_profile.onCreated(function() {
    var template = this;

    template.profileId = new ReactiveVar();

    var profile_sub;

    template.autorun(function() {
        var id = Template.currentData().profileId;
        profile_sub = Meteor.subscribe('users.one', id); // subs manager fails here
    });

    template.autorun(function() {
        if (!profile_sub.ready()) return;

        var user = Meteor.users.findOne(template.data.profileId);
        if (!user) return Router.pageNotFound('profile');

        template.profileId.set(user._id);
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
        if (!user) return;

        profile = user.profile;
        profile.participation_score = User(user).getReadableScore();
        return profile;
    },

    getRoundedScore: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getReadableScore();
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
        Session.set('discover.query.location', location);
        Router.go('discover');
    }
});
