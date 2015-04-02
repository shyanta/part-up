Template.WidgetStartPromote.onCreated(function(){
    this.shared = new ReactiveVar({
        twitter: false,
        facebook: false,
        linkedin: false
    });
});

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
        sharedSocials[socialTarget] = !sharedSocials[socialTarget];
        template.shared.set(sharedSocials);
    }
});


