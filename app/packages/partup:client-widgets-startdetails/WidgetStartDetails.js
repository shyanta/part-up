Template.WidgetStartDetails.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    partup: function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Partups.findOne({ _id: partupId });
    },
    fieldsFromPartup: function() {
        var partupId = Session.get('partials.start-partup.current-partup');
        if (partupId) {
            var partup = Partups.findOne({_id: partupId});
            if(partup) {
                return Partup.transformers.partup.toFormStartPartup(partup);
            } else {
                return undefined;
            }
        }
        return undefined;
    },
    uploadedImage: function() {
        return Images.findOne({_id:Session.get('partials.start-partup.uploaded-image')});
    },
    user: function() {
        return Meteor.user();
    }
});

Template.WidgetStartDetails.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template){
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-imageupload]');
        input.click();
    },
    'change [data-imageupload]': function eventChangeFile(event, template){
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                // TODO: Handle error in frontend
                // TODO: Somehow show the image in frontend
                template.$('input[name=image]').val(image._id);
                Meteor.subscribe('images.one', image._id);
                Session.set('partials.start-partup.uploaded-image', image._id);
            });
        });
    }
});

Template.WidgetStartDetails.rendered = function() {
    this.$('.pu-datepicker').datepicker({
        language: moment.locale(),
        format: "yyyy-mm-dd",
    });
};

AutoForm.hooks({
    partupForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            var partupId = Session.get('partials.start-partup.current-partup');

            if(partupId) {
                Meteor.call('partups.update', partupId, insertDoc, function(error, res){
                    if(error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    Router.go('start-activities', {_id:partupId});
                });
            } else {
                Meteor.call('partups.insert', insertDoc, function(error, res){
                    if(error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    Session.set('partials.start-partup.current-partup', res._id);
                    Router.go('start-activities', {_id:res._id});
                })
            }
        }
    }
});
