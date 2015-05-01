/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetStartDetails.onCreated(function(){
    var template = this;

    // loading boolean
    template.uploadingPictures = new ReactiveVar(false);
    // uploaded picture url
    template.uploadedImageUrl = new ReactiveVar('');

    // character countdown
    template.nameCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.name.max);
    template.descriptionCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.description.max);

    // runs after image is updated
    template.autorun(function(){
        // get the current image
        var image = Images.findOne({_id:Session.get('partials.start-partup.uploaded-image')});
        if(!image) return;

        // load image from url
        var loadImage = new Image;
        loadImage.onload = function() {
            // this = image
            var src = this.src;

            // set image url
            template.uploadedImageUrl.set(src);
            // set loading false
            template.uploadingPictures.set(false);
        };
        // set image url to be loaded
        loadImage.src = image.url();
    });
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
    suggestedImagesAvailable: function () {
        return undefined !== Session.get('partials.start-partup.suggested-images');
    },
    suggestedImages: function () {
        return Session.get('partials.start-partup.suggested-images');
    },
    uploadedImageUrl: function() {
        var image = Images.findOne({_id:Session.get('partials.start-partup.uploaded-image')});
        if(image) {
            return image.url();
        } else {
            return Template.instance().uploadedImageUrl.get();
        }
    },
    user: function() {
        return Meteor.user();
    },
    uploadingPictures: function(){
        return Template.instance().uploadingPictures.get();
    },
    nameCharactersLeft: function(){
        return Template.instance().nameCharactersLeft.get();
    },
    descriptionCharactersLeft: function(){
        return Template.instance().descriptionCharactersLeft.get();
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
        // set loading true
        template.uploadingPictures.set(true);

        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                // TODO: Handle error in frontend
                // TODO: Somehow show the image in frontend
                template.$('input[name=image]').val(image._id);
                Meteor.subscribe('images.one', image._id);
                Session.set('partials.start-partup.uploaded-image', image._id);

            });
        });
    },
    'blur input[name=tags_input]': function searchFlickerByTags(event, template) {
        //var suggestions = [];
        //var tags = template.$('input[name=tags_input]').val().replace(/\s/g, '').split(',');
        //
        //Meteor.call('partups.services.splashbase.search', tags, function(error, result) {
        //    suggestions = suggestions.concat(result);
        //    if (suggestions.length >= 5) {
        //        Session.set('partials.start-partup.suggested-images', suggestions);
        //    } else {
        //        Meteor.call('partups.services.flickr.search', tags, function(error, result) {
        //            suggestions = suggestions.concat(result).slice(0, 5);
        //            Session.set('partials.start-partup.suggested-images', suggestions);
        //        });
        //    }
        //});
    },
    'keyup [data-max]': function updateMax(event, template){
        var max = eval($(event.target).data("max"));
        var charactersLeftVar = $(event.target).data("characters-left-var");

        template[charactersLeftVar].set(max - $(event.target).val().length);
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
