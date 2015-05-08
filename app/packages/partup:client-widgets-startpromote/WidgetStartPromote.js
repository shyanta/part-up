/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetStartPromote.onRendered(function () {
    var elm = this.find('[data-copy-to-clipboard]');

    // Copy to clipboard
    Partup.ui.clipboard.applyToElement(elm, elm.value, function onCopySuccess() {
        Partup.ui.notify.success(__('startpromote-notify-copy-to-clipboard-success'));
    }, function onCopyError() {
        Partup.ui.notify.error(__('startpromote-notify-copy-to-clipboard-error'));
    });
});

Template.WidgetStartPromote.onCreated(function () {
    this.shared = new ReactiveVar({
        twitter: false,
        facebook: false,
        linkedin: false
    });
});

/*************************************************************/
/* Widget Functions */
/*************************************************************/
var getPartup = function () {
    var partupId = Session.get('partials.start-partup.current-partup');
    return Partups.findOne({ _id: partupId });
};

var partupUrl = function() {
    var partupId = Router.current().params._id;
    return Router.url('partup-detail', {_id:partupId});
}

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartPromote.helpers({
    Partup: Partup,

    placeholders: Partup.services.placeholders.startdetails,

    partup: getPartup,

    partupUrl: function () {
        return partupUrl();
    },

    shared: function () {
        return Template.instance().shared.get();
    },

    partupCover: function () {
        if (!getPartup() || !getPartup().image) return null;
        var imageId = getPartup().image;
        return Images.findOne({ _id: imageId });
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartPromote.events({

    'click [data-share]': function sharePartup(event, template) {
        var socialTarget = $(event.currentTarget).data("share");
        var sharedSocials = template.shared.get();

        if (!sharedSocials[socialTarget]) {
            sharedSocials[socialTarget] = true;
            template.shared.set(sharedSocials);
            Partup.ui.notify.success(__('startpromote-notify-shared-success', socialTarget));
        } else {
            Partup.ui.notify.error(__('startpromote-notify-shared-error', socialTarget));
        }
    },

    'click [data-copy-to-clipboard]': function eventCopyToClipboard(event) {
        var elm = event.currentTarget;

        // Select elements text
        elm.select();
    },

    'click [data-action-topartup]': function eventToPartup() {
        var partupId = Router.current().params._id;
        Partup.ui.modal.executeIntentCallback('start', partupId, function () {

            // Router go
            Router.go('partup-detail', {_id: partupId});

        });
    },

    'click [data-share-facebook]': function clickShareFacebook() {
        var url = partupUrl();
        var facebookUrl = Partup.ui.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var url = partupUrl();
        var message = getPartup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.ui.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin() {
        var url = partupUrl();
        var linkedInUrl = Partup.ui.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    }

});