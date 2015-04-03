Template.WidgetStartPromote.onCreated(function(){
    this.shared = new ReactiveVar({
        twitter: false,
        facebook: false,
        linkedin: false
    });
});

Template.WidgetStartPromote.onRendered(function(){
    var clipboardCopyElement = $(this.find('[data-copy-to-clipboard]'));
    Partup.ui.clipboard.applyToElement(clipboardCopyElement, function copyCallBack(){
        Partup.ui.notify.success(__('startpromote-notify-copy-to-clipboard-success'));
    });
})

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
    }
});


