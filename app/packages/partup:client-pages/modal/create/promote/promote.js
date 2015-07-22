/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.modal_create_promote.onRendered(function() {
    var template = this;

    var elm = template.find('[data-copy-to-clipboard]');

    // Copy to clipboard
    Partup.client.clipboard.applyToElement(elm, elm.value, function onCopySuccess() {
        Partup.client.notify.success(__('pages-modal-create-promote-notify-copy-to-clipboard-success'));
    }, function onCopyError() {
        Partup.client.notify.error(__('pages-modal-create-promote-notify-copy-to-clipboard-error'));
    });

    template.autorun(function() {
        var partup = getPartup();

        if (partup) {
            var image = Images.findOne({_id: partup.image});

            if (image) {
                var focuspointElm = template.find('[data-partupcover-focuspoint]');
                template.focuspoint = new Focuspoint.View(focuspointElm, {
                    x: image.focuspoint.x,
                    y: image.focuspoint.y
                });
            }
        }
    });
});

Template.modal_create_promote.onCreated(function() {
    this.subscribe('partups.one', this.data.partupId);

    var template = this;

    template.shared = new ReactiveVar({
        twitter: false,
        facebook: false,
        linkedin: false
    });
});

/*************************************************************/
/* Widget Functions */
/*************************************************************/
var getPartup = function() {
    var partupId = Session.get('partials.create-partup.current-partup');
    return Partups.findOne({_id: partupId});
};

var partupUrl = function() {
    var partupId = Router.current().params._id;
    return Router.url('partup', {_id:partupId});
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_promote.helpers({
    Partup: Partup,

    partup: getPartup,

    partupUrl: function() {
        return partupUrl();
    },

    shared: function() {
        return Template.instance().shared.get();
    },

    fixFooter: function() {
        var scrollPos = Partup.client.scroll.pos.get();

        if (!Partup.client.scroll._element) return false;
        var maxScroll = Partup.client.scroll._element.scrollHeight - Partup.client.scroll._element.clientHeight;

        return scrollPos < maxScroll - 50;
    },

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_promote.events({

    'click [data-share]': function sharePartup(event, template) {
        var socialTarget = $(event.currentTarget).data('share');
        var sharedSocials = template.shared.get();

        if (!sharedSocials[socialTarget]) {
            sharedSocials[socialTarget] = true;
            template.shared.set(sharedSocials);
        }
    },

    'click [data-copy-to-clipboard]': function eventCopyToClipboard(event) {
        var elm = event.currentTarget;

        // Select elements text
        elm.select();
    },

    'click [data-action-topartup]': function eventToPartup(event, template) {
        event.preventDefault();

        Intent.return('create', {
            arguments: [template.data.partupId],
            fallback_route: {
                name: 'partup',
                params: {
                    _id: template.data.partupId
                }
            }
        });
    },

    'click [data-share-facebook]': function clickShareFacebook() {
        var url = partupUrl();
        var facebookUrl = Partup.client.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var url = partupUrl();
        var message = getPartup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.client.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin() {
        var url = partupUrl();
        var linkedInUrl = Partup.client.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    }

});
