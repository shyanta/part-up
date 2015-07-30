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
