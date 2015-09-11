var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_network.onCreated(function() {
    var tpl = this;

    tpl.joinToggle = new ReactiveVar(false);

    tpl.networkId = new ReactiveVar();

    var network_sub;

    tpl.autorun(function() {
        var slug = Template.currentData().networkSlug;
        network_sub = Subs.subscribe('networks.one', slug, {
            onReady: function() {
                var network = Networks.findOne({slug: tpl.data.networkSlug});
                if (!network) Router.pageNotFound('network');
                tpl.networkId.set(network._id);
            }
        });
    });
    tpl.expanded = false;
    tpl.autorun(function() {
        var scrolled = Partup.client.scroll.pos.get() > 100;
        if (scrolled && tpl.expanded) {
            if (tpl.view.isRendered) {
                tpl.expandText(false);
            }
        }
    });
    tpl.expandText = function(expand) {
        var clickedElement = $('[data-expand]');
        if (!clickedElement) return;
        var parentElement = $(clickedElement[0].parentElement);

        var collapsedText = __(clickedElement.data('collapsed-key')) || false;
        var expandedText = __(clickedElement.data('expanded-key')) || false;

        if (expand) {
            if (expandedText) clickedElement.html(expandedText);
            parentElement.addClass('pu-state-open');
            clickedElement.parents('.pu-sub-pageheader').addClass('pu-state-descriptionexpanded');
        } else {
            if (collapsedText) clickedElement.html(collapsedText);
            parentElement.removeClass('pu-state-open');
            clickedElement.parents('.pu-sub-pageheader').removeClass('pu-state-descriptionexpanded');
        }
        tpl.expanded = expand;
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
    },

    joinToggle: function() {
        return Template.instance().joinToggle.get();
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

            analytics.track('joined network', {
                networkId: network._id
            });
        }
    });
};

var leaveNetwork = function(template, network) {
    Meteor.call('networks.leave', network._id, function(error) {
        if (error) {
            Partup.client.notify.error(error.reason);
            return;
        }
        template.joinToggle.set(!template.joinToggle.get());

        Partup.client.notify.success(__('pages-app-network-notification-left'));
        Subs.reset();
        if (network.isClosedForUpper(Meteor.user())) {
            Router.go('discover');
        }
        analytics.track('left network', {
            networkId: network._id
        });
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
                template.joinToggle.set(!template.joinToggle.get());

                if (network.isClosed()) {
                    Partup.client.notify.success(__('pages-app-network-notification-accepted_waitingforapproval'));
                } else {
                    Partup.client.notify.success(__('pages-app-network-notification-joined'));
                    analytics.track('joined network', {
                        networkId: network._id
                    });
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
        var proceedAccept = function(user) {
            var network = Networks.findOne({slug: template.data.networkSlug});
            Meteor.call('networks.join', network._id, function(error) {
                if (error) return Partup.client.notify.error(error.reason);
                template.joinToggle.set(!template.joinToggle.get());
                if (!network.isClosed()) {
                    Partup.client.notify.success(__('pages-app-network-notification-joined'));
                }
            });
        }
        event.preventDefault();
        var user = Meteor.user();
        if (!user) {
            Intent.go({route: 'login'}, function(loggedInUser) {
                if (loggedInUser) proceedAccept(loggedInUser);
                else Partup.client.notify.error(__('pages-app-network-notification-failed'));
            });
            return
        }
        proceedAccept(user);
    },
    'click [data-leave]': function(event, template) {
        var network = Networks.findOne({slug: template.data.networkSlug});

        Partup.client.prompt.confirm({
            title: __('pages-app-network-confirmation-title', {
                tribe: network.name
            }),
            message: __('pages-app-network-confirmation-message'),
            confirmButton: __('pages-app-network-confirmation-confirm-button'),
            cancelButton: __('pages-app-network-confirmation-cancel-button'),
            onConfirm: function() {
                leaveNetwork(template, network);
            }
        });

    },
    'click [data-request-invite]': function(event, template) {
        event.preventDefault();

        var requestInvite = function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            Meteor.call('networks.join', network._id, function(err) {
                if (err) {
                    console.error(err);
                    Partup.client.notify.error(__(err));
                }
            });
        };

        if (Meteor.user()) {
            requestInvite();
        } else {
            Intent.go({route: 'login'}, function() {
                requestInvite();
            });
        }
    },
    'click [data-expand]': function(event, template) {
        template.expandText(!template.expanded);
    },
    'click [data-open-networksettings]': function(event, template) {
        event.preventDefault();
        Intent.go({
            route: 'network-settings',
            params: {
                slug: template.data.networkSlug
            }
        });
    },
    'click [data-location]': function(event, template) {
        var location = Networks.findOne({slug: template.data.networkSlug}).location;
        Session.set('discover.query.location', location);
        Meteor.defer(function() {
            Router.go('discover');
        });
    }
});
