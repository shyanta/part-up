/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetStartDetails.onCreated(function(){
    this.uploadingPictures = new ReactiveVar(false);
    this.suggestedCovers = new ReactiveVar();
});

Template.WidgetStartDetails.onRendered(function() {
    Partup.ui.datepicker.applyToInput(this, '.pu-datepicker');
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
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
    suggestedImages: function () {
        var images = Template.instance().suggestedCovers.get();
        console.log(images);
        return Template.instance().suggestedCovers.get();
    },
    uploadedImage: function() {
        return Images.findOne({_id:Session.get('partials.start-partup.uploaded-image')});
    },
    user: function() {
        return Meteor.user();
    },
    uploadingPictures: function(){
        return Template.instance().uploadingPictures.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartDetails.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template){
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-imageupload]');
        input.click();
    },
    'change [data-imageupload]': function eventChangeFile(event, template){
        template.uploadingPictures.set(true);

        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                // TODO: Handle error in frontend
                // TODO: Somehow show the image in frontend
                template.$('input[name=image]').val(image._id);
                Meteor.subscribe('images.one', image._id);
                Session.set('partials.start-partup.uploaded-image', image._id);


                template.uploadingPictures.set(false);

            });
        });
    },
    'blur input[name=tags_input]': function searchFlickerByTags(event, template) {
        var tags = template.$('input[name=tags_input]').val().replace(/\s/g, '').split(',');
        Meteor.call('partups.images.tags.search', tags, 5, function(error, result){
            template.suggestedCovers.set(result);
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    partupForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var partupId = Session.get('partials.start-partup.current-partup');

            if(partupId) {

                // Partup already exists. Update.
                Meteor.call('partups.update', partupId, insertDoc, function(error, res){
                    if(error && error.message) {
                        switch (error.message) {
                            // case 'User not found [403]':
                            //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            //     break;
                            default:
                                Partup.ui.notify.error(error.reason);
                        }
                        AutoForm.validateForm(self.formId);
                        self.done(new Error(error.message));
                        return;
                    }
                    
                    Router.go('start-activities', {_id:partupId});
                });

            } else {

                // Partup does not exists yet. Insert.
                Meteor.call('partups.insert', insertDoc, function(error, res){
                    if(error && error.message) {
                        switch (error.message) {
                            // case 'User not found [403]':
                            //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            //     break;
                            default:
                                Partup.ui.notify.error(error.reason);
                        }
                        AutoForm.validateForm(self.formId);
                        self.done(new Error(error.message));
                        return;
                    }

                    Session.set('partials.start-partup.current-partup', res._id);
                    Router.go('start-activities', {_id:res._id});
                });

            }

            return false;
        }
    }
});
