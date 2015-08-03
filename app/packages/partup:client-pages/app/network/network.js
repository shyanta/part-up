var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_network.onCreated(function() {
    var tpl = this;

    tpl.networkId = new ReactiveVar();

    var network_sub;

    tpl.autorun(function() {
        var slug = Template.currentData().networkSlug;
        network_sub = Subs.subscribe('networks.one', slug);
    });

    tpl.autorun(function() {
        if (network_sub.ready()) {
            var network = Networks.findOne({slug: tpl.data.networkSlug});
            if (!network) Router.pageNotFound('network');

            tpl.networkId.set(network._id);
        }
    });
    tpl.autorun(function() {
        var scrolled = Partup.client.scroll.pos.get() > 100;
        if (scrolled) {
            if (tpl.view.isRendered) tpl.toggleExpandedText(true);
        }
    });
    tpl.toggleExpandedText = function(hide) {
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
Template.app_network.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    },

    isInvitePending: function() {
        var user = Meteor.user();
        if (!user || !user.pending_networks) return false;
        return mout.array.contains(user.pending_networks, this.networkId);
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

// The 'networks.joins' method handles the different possible states (uninvited or invited)
var joinNetworkOrAcceptInvitation = function(slug) {
    var network = Networks.findOne({slug: slug});
    Meteor.call('networks.join', network._id, function(error) {
        if (error) {
            Partup.client.notify.error(error.reason);
        } else {
            Partup.client.notify.success('Joined network');
        }
    });
};

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_network.events({
    'click [data-join]': function(event, template) {
        event.preventDefault();
        var user = Meteor.user();

        var proceed = function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            Meteor.call('networks.join', network._id, function(error) {
                if (error) return Partup.client.notify.error(error.reason);

                if (network.isClosed()) {
                    Partup.client.notify.success(__('pages-app-network-notification-accepted_waitingforapproval'));
                } else {
                    Partup.client.notify.success(__('pages-app-network-notification-joined'));
                }
            });
        };

        if (user) {
            proceed();
        } else {
            Intent.go({route: 'login'}, function(loggedInUser) {
                if (loggedInUser) proceed();
                else Partup.client.notify.error(__('pages-app-network-notification-failed'));
            });
        }
    },
    'click [data-accept]': function(event, template) {
        event.preventDefault();
        var user = Meteor.user();
        if (!user) return; // button should not be rendered when no user is logged in

        var network = Networks.findOne({slug: template.data.networkSlug});
        Meteor.call('networks.join', network._id, function(error) {
            if (error) return Partup.client.notify.error(error.reason);
            if (!network.isClosed()) {
                Partup.client.notify.success(__('pages-app-network-notification-joined'));
            }
        });
    },
    'click [data-leave]': function(event, template) {
        var network = Networks.findOne({slug: template.data.networkSlug});

        Meteor.call('networks.leave', network._id, function(error) {
            if (error) Partup.client.notify.error(error.reason);
            else Partup.client.notify.success(__('pages-app-network-notification-left'));
        });
    },
    'click [data-expand]': function(event, template) {
        template.toggleExpandedText();
    },
    'click [data-open-networksettings]': function(event, template) {
        Intent.go({
            route: 'network-settings',
            params: {
                slug: template.data.networkSlug
            }
        });
    },
    'click [data-location]': function(event, template) {
        var location = Networks.findOne({slug: template.data.networkSlug}).location;
        Session.set('discover.location', location);
        Router.go('discover');
    }
});
