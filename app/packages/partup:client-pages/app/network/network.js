Template.app_network.onCreated(function() {
    var template = this;

    template.networkSubscription = template.subscribe('networks.one', template.data.networkSlug);
    template.autorun(function(c) {
        if (template.networkSubscription.ready()) {
            c.stop();

            if (!Networks.findOne({slug: template.data.networkSlug})) {
                Router.pageNotFound('network');
            }
        }
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network.helpers({
    network: function() {
        var network = Networks.findOne({slug: this.networkSlug});
        return network;
    },

    getCleanUrl: Partup.client.url.getCleanUrl,

    isInvitePending: function() {
        var user = Meteor.user();
        if (!user || !user.pending_networks) return false;
        return mout.array.contains(user.pending_networks, this.networkId);
    },

    userId: function() {
        return Meteor.userId();
    },

    subscriptionsReady: function() {
        return Template.instance().networkSubscription.ready();
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

var joinNetwork = function(networkId) {
    Meteor.call('networks.join', networkId, function(error) {
        if (error) {
            Partup.client.notify.error(error.reason);
        } else {
            Partup.client.notify.success('joined network');
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
            joinNetwork(network._id);
        };

        if (user) {
            proceed();
        } else {
            Intent.go({route: 'login'}, function(loggedInUser) {
                if (loggedInUser) proceed();
                else Partup.client.notify.error('failed to join network');
            });
        }
    },
    'click [data-leave]': function(event, template) {
        var network = Networks.findOne({slug: template.data.networkSlug});

        Meteor.call('networks.leave', network._id, function(error) {
            if (error) Partup.client.notify.error(error.reason);
            else Partup.client.notify.success('left network');
        });
    },
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
