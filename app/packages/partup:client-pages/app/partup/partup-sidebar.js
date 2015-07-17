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
        var partup = template.data.partup;
        if (!partup) return;

        var image = Images.findOne({_id: partup.image});
        if (!image) return;

        var focuspointElm = template.find('[data-partupcover-focuspoint]');
        template.focuspoint = new Focuspoint.View(focuspointElm, {
            x: image.focuspoint.x,
            y: image.focuspoint.y
        });
    });
});

/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.app_partup_sidebar.helpers({

    numberOfSupporters: function() {
        var partup = this.partup;
        if (!partup) return '...';
        return partup.supporters ? partup.supporters.length : '0';
    },

    isSupporter: function() {
        var user = Meteor.user();
        if (!this.partup || !this.partup.supporters || !user) return false;
        return this.partup.supporters.indexOf(Meteor.user()._id) > -1;
    },

    isUpperInPartup: function() {
        var user = Meteor.user();
        if (!user) return false;
        var partup = this.partup;
        if (!partup) return false;
        return partup.hasUpper(user._id);
    },

    partupUppers: function() {
        if (!this.partup) return;

        var uppers = this.partup.uppers || [];
        if (!uppers || !uppers.length) return [];

        return Meteor.users.findMultiplePublicProfiles(uppers);
    },

    partupSupporters: function() {
        if (!this.partup) return;

        var supporters = this.partup.supporters;
        if (!supporters || !supporters.length) return [];

        return Meteor.users.findMultiplePublicProfiles(supporters);
    },
    showTakePartButton: function(argument) {
        var user = Meteor.user();
        return !user || !this.partup || !this.partup.hasUpper(user._id);
    },
    statusText: function() {
        if (!this.partup) return '';

        var city = mout.object.get(this, 'partup.location.city') || mout.object.get(this, 'partup.location.country');

        var status = [];
        if (this.partup.budget_type) {
            status.push(__('pages-app-partup-status_text-with-budget', {
                date: moment(this.partup.end_date).format('LL'),
                city: city,
                budget: prettyBudget(this.partup)
            }));
        } else {
            status.push(__('pages-app-partup-status_text-without-budget', {
                date: moment(this.partup.end_date).format('LL'),
                city: city
            }));
        }

        var networkText;
        if (this.partup.network_id) {
            var network = Networks.findOne({_id: this.partup.network_id});
            networkText = network.name;

            var networkPath = Router.path('network-detail', {_id: this.partup.network_id});
        }

        switch (this.partup.privacy_type) {
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

    'click [data-joinsupporters]': function clickJoinSupporters() {
        var partupId = Router.current().params._id;

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

    'click [data-leavesupporters]': function clickLeaveSupporters() {
        Meteor.call('partups.supporters.remove', Router.current().params._id);
    },

    'click [data-share-facebook]': function clickShareFacebook() {
        var currentUrl = Router.current().location.get().href;
        var shareUrl = Partup.client.socials.generateFacebookShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var currentUrl = Router.current().location.get().href;
        var message = template.data.partup.name;
        var shareUrl = Partup.client.socials.generateTwitterShareUrl(message, currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin(event, template) {
        var currentUrl = Router.current().location.get().href;
        var shareUrl = Partup.client.socials.generateLinkedInShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-mail]': function clickShareMail() {
        var currentUrl = Router.current().location.get().href;
        var subject = '';
        var body = 'You should check out this Part-up!\n' + currentUrl;
        var shareUrl = Partup.client.socials.generateMailShareUrl(subject, body);
        window.location.href = shareUrl;
    },

    'click [data-open-takepart-popup]': function clickOpenTakepartPopup() {
        Partup.client.popup.open('take-part');
    }
});
