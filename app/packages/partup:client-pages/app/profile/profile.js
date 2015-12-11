var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_profile.onCreated(function() {
    var template = this;

    var profileId = template.data.profileId;
    template.subscribe('users.one', profileId);

    template.autorun(function() {
        var scrolled = Partup.client.scroll.pos.get() > 100;
        if (scrolled) {
            if (template.view.isRendered) template.toggleExpandedText(true);
        }
    });

    template.toggleExpandedText = function(hide) {
        var clickedElement = $('[data-expand]');
        if (!clickedElement || !clickedElement[0]) return;
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
    template.profileLoaded = new ReactiveVar(false);
    template.autorun(function(computation) {
        var loaded = template.profileLoaded.get();
        if (!loaded) return;
        Tracker.nonreactive(function() {
            var profile = Meteor.users.findOne(template.data.profileId);
            var isViewable = User(profile).aboutPageIsViewable();
            if (!isViewable) {
                Router.replaceYieldTemplate('app_profile_upper_partups', 'app_profile');
            }
        });
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_profile.helpers({
    profile: function() {
        var profile = Meteor.users.findOne(this.profileId);
        if (!profile) return;

        // hide about page when there is no content
        Template.instance().profileLoaded.set(true);

        return {
            data: profile.profile,
            hasAboutSection: function() {
                return User(profile).aboutPageIsViewable();
            },
            firstname: function() {
                return User(profile).getFirstname();
            },
            roundedScore: function() {
                return User(profile).getReadableScore();
            },
            isCurrentUser: function() {
                return profile._id === Meteor.userId();
            },
            hasTilesOrIsCurrentUser: function() {
                var viewable = User(pofile).aboutPageIsViewable();
                return viewable;
            }
        };
    },

    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 100;
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
        event.preventDefault();
        template.toggleExpandedText();
    },
    'click [data-open-profilesettings]': function(event, template) {
        event.preventDefault();
        Intent.go({
            route: 'profile-settings',
            params: {
                _id: template.data.profileId
            }
        });
    },
    'click [data-location]': function(event, template) {
        event.preventDefault();
        var location = Meteor.users.findOne(template.data.profileId).profile.location;
        Partup.client.discover.setPrefill('locationId', location.place_id);
        Partup.client.discover.setCustomPrefill('locationLabel', location.city);
        Router.go('discover');
    }
});
