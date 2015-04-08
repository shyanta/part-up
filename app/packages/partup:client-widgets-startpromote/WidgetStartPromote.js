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

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartPromote.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    partup: getPartup,
    uploadedImage: function () {
        return Images.findOne({_id: Session.get('partials.start-partup.uploaded-image')});
    },
    partupUrl: function () {
        return 'http://part-up.com/' + Session.get('partials.start-partup.current-partup');
    },
    shared: function () {
        return Template.instance().shared.get();
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
        var url = Router.current().location.get().href;
        var facebookUrl = Partup.ui.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var url = Router.current().location.get().href;
        var message = getPartup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.ui.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin() {
        var url = Router.current().location.get().href;
        var linkedInUrl = Partup.ui.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    }

});