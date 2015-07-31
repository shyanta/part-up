/**
 * Render budget properly
 *
 * @param {Partup} partup
 * @return {String}
 * @ignore
 */
var prettyBudget = function(partup) {
    var budget = partup['budget_' + partup.budget_type ];
    var budgetUnit = __('pages-app-partup-unit-' + partup.budget_type);
    return budget + '  ' + budgetUnit;
};

/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.app_partup_sidebar.onRendered(function() {
    var template = this;

    template.autorun(function() {
        var partup = Partups.findOne(template.data.partupId);
        if (!partup) return;

        var image = Images.findOne({_id: partup.image});
        if (!image) return;

        var focuspointElm = template.find('[data-partupcover-focuspoint]');
        template.focuspoint = new Focuspoint.View(focuspointElm, {
            x: mout.object.get(image, 'focuspoint.x'),
            y: mout.object.get(image, 'focuspoint.y')
        });
    });
});

/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.app_partup_sidebar.helpers({
    partup: function() {
        return Partups.findOne(this.partupId);
    },

    numberOfSupporters: function() {
        var partup = Partups.findOne(this.partupId);
        if (!partup) return '...';
        return partup.supporters ? partup.supporters.length : '0';
    },

    isSupporter: function() {
        var partup = Partups.findOne(this.partupId);
        var user = Meteor.user();
        if (!partup || !partup.supporters || !user) return false;
        return partup.supporters.indexOf(Meteor.user()._id) > -1;
    },

    isUpperInPartup: function() {
        var user = Meteor.user();
        if (!user) return false;
        var partup = Partups.findOne(this.partupId);
        if (!partup) return false;
        return partup.hasUpper(user._id);
    },

    partupUppers: function() {
        var partup = Partups.findOne(this.partupId);
        if (!partup) return;

        var uppers = partup.uppers || [];
        if (!uppers || !uppers.length) return [];

        var users = Meteor.users.findMultiplePublicProfiles(uppers).fetch();
        users = lodash.sortBy(users, function(user) {
            return this.indexOf(user._id);
        }, uppers);

        return users;
    },

    partupSupporters: function() {
        var partup = Partups.findOne(this.partupId);
        if (!partup) return;

        var supporters = partup.supporters;
        if (!supporters || !supporters.length) return [];

        return Meteor.users.findMultiplePublicProfiles(supporters);
    },
    showTakePartButton: function(argument) {
        var user = Meteor.user();
        var partup = Partups.findOne(this.partupId);
        return !user || !partup || !partup.hasUpper(user._id);
    },
    statusText: function() {
        var partup = Partups.findOne(this.partupId);
        if (!partup) return '';

        var city = mout.object.get(partup, 'location.city') || mout.object.get(partup, 'location.country');

        var status = [];
        if (partup.budget_type) {
            status.push(__('pages-app-partup-status_text-with-budget', {
                date: moment(partup.end_date).format('LL'),
                city: city,
                budget: prettyBudget(partup)
            }));
        } else {
            status.push(__('pages-app-partup-status_text-without-budget', {
                date: moment(partup.end_date).format('LL'),
                city: city
            }));
        }

        var networkText = '';
        var networkPath = '';
        if (partup.network_id) {
            var network = Networks.findOne({_id: partup.network_id});
            if (network) {
                networkText = network.name;
                networkPath = Router.path('network-detail', {slug: network.slug});
            }
        }

        switch (partup.privacy_type) {
            case Partups.PUBLIC:
                status.push(__('pages-app-partup-status_text-public'));
                break;
            case Partups.PRIVATE:
                status.push(__('pages-app-partup-status_text-private'));
                break;
            case Partups.NETWORK_PUBLIC:
                status.push(__('pages-app-partup-status_text-network-public', {network: networkText, path: networkPath}));
                break;
            case Partups.NETWORK_INVITE:
                status.push(__('pages-app-partup-status_text-network-invite', {network: networkText, path: networkPath}));
                break;
            case Partups.NETWORK_CLOSED:
                status.push(__('pages-app-partup-status_text-network-closed', {network: networkText, path: networkPath}));
                break;
        }

        return status.join(' ');
    }
});

/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_partup_sidebar.events({

    'click [data-joinsupporters]': function(event, template) {
        var partupId = template.data.partupId;

        if (Meteor.user()) {
            Meteor.call('partups.supporters.insert', partupId);
        } else {
            Intent.go({
                route: 'login'
            }, function(user) {
                if (user) Meteor.call('partups.supporters.insert', partupId);
            });
        }
    },

    'click [data-leavesupporters]': function(event, template) {
        Meteor.call('partups.supporters.remove', template.data.partupId);
    },

    'click [data-share-facebook]': function() {
        var currentUrl = Router.current().location.get().href;
        var shareUrl = Partup.client.socials.generateFacebookShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var currentUrl = Router.current().location.get().href;
        var message = partup.name;
        var shareUrl = Partup.client.socials.generateTwitterShareUrl(message, currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function(event, template) {
        var currentUrl = Router.current().location.get().href;
        var shareUrl = Partup.client.socials.generateLinkedInShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-mail]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var user = Meteor.user();
        var currentUrl = Router.url('partup', {slug: partup.slug});
        if (!user) {
            var body = __('pages-app-partup-share_mail_anonymous', {url: currentUrl, partup_name:partup.name});
        } else {
            var body = __('pages-app-partup-share_mail', {url: currentUrl, partup_name: partup.name, user_name: user.profile.name});
        }
        var subject = '';
        var shareUrl = Partup.client.socials.generateMailShareUrl(subject, body);
        window.location.href = shareUrl;
    },

    'click [data-open-takepart-popup]': function() {
        Partup.client.popup.open('take-part');
    }
});
