/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetStartPromote.onRendered(function () {
    var elm = this.find('[data-copy-to-clipboard]');

    // Copy to clipboard
    Partup.ui.clipboard.applyToElement(elm, elm.value, function onCopySuccess () {
        Partup.ui.notify.success(__('startpromote-notify-copy-to-clipboard-success'));
    }, function onCopyError () {
        Partup.ui.notify.error(__('startpromote-notify-copy-to-clipboard-error'));
    });
});

Template.WidgetStartPromote.onCreated(function (){
    this.shared = new ReactiveVar({
        twitter: false,
        facebook: false,
        linkedin: false
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartPromote.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    partup: function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Partups.findOne({ _id: partupId });
    },
    uploadedImage: function() {
        return Images.findOne({_id:Session.get('partials.start-partup.uploaded-image')});
    },
    partupUrl: function(){
        return 'http://part-up.com/' + Session.get('partials.start-partup.current-partup');
    },
    shared: function(){
        return Template.instance().shared.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartPromote.events({

    'click [data-share]': function sharePartup(event, template){
        var socialTarget = $(event.currentTarget).data("share");
        var sharedSocials = template.shared.get();

        if(!sharedSocials[socialTarget]){
            sharedSocials[socialTarget] = true;
            template.shared.set(sharedSocials);
            Partup.ui.notify.success(__('startpromote-notify-shared-success', socialTarget));
        } else {
            Partup.ui.notify.error(__('startpromote-notify-shared-error', socialTarget));
        }
    },

    'click [data-copy-to-clipboard]': function eventCopyToClipboard (event) {
        var elm = event.currentTarget;

        // Select elements text
        elm.select();
    },

    'click [data-action-topartup]': function eventToPartup () {

        var partupId = Router.current().params._id;
        var hasIntent = Partup.ui.modal.hasIntentCallback('start');

        if(hasIntent) {

            // Execute intent
            Partup.ui.modal.executeIntentCallback('start', partupId);

        } else {

            // Router go
            Router.go('partup-detail', { _id: partupId });

        }

    }

});