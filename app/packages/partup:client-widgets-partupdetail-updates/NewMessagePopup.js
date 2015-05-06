Template.NewMessagePopup.onCreated(function(){
    var template = this;

    template.uploadingPhotos = new ReactiveVar(false);
    template.uploadedPhotos = new ReactiveVar([
        {
            url: 'http://lorempixel.com/200/200/people/1'
        },
        {
            url: 'http://lorempixel.com/200/200/people/2'
        }
    ]);
});

// helpers
Template.NewMessagePopup.helpers({
    uploadingPhotos: function(){
        return Template.instance().uploadingPhotos.get();
    },
    uploadedPhotos: function(){
        return Template.instance().uploadedPhotos.get();
    }
});


// events
Template.NewMessagePopup.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template){
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-photo-input]');
        input.click();
    },
    'change [data-photo-input]': function eventChangeFile(event, template){
        template.uploadingPhotos.set(true);
        
        Meteor.setTimeout(function(){
            template.uploadingPhotos.set(false);

        }, 1000);
    }
})