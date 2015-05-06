/*************************************************************/
/* Widget image system */
/*************************************************************/
var ImageSystem = function ImageSystemConstructor () {
    var self = this;

    this.currentImageId = new ReactiveVar(false);
    this.uploadedImageId = new ReactiveVar(false);
    this.upload = new ReactiveVar(false);
    this.suggestion = new ReactiveVar(false);
    this.availableSuggestions = new ReactiveVar([]);

    this.addAvailableSuggestions = function (suggestions) {
        var newSuggestionsArray = mout.array.combine(self.availableSuggestions.get(), suggestions).slice(0, 5);
        self.availableSuggestions.set(newSuggestionsArray);
    };

    this.updateSuggestions = function (tags) {
        Meteor.call('partups.services.splashbase.search', tags, function(error, result) {
            if (result.length >= 5) {
                self.addAvailableSuggestions(lodash.map(result, 'imageUrl'));
            } else {
                Meteor.call('partups.services.flickr.search', tags, function(error, result) {
                    self.addAvailableSuggestions(lodash.map(result, 'imageUrl'));
                });
            }
        });
    };

    this.unsetUploadedPicture = function () {
        self.upload.set(false);
        self.currentImageId.set(false);
    };
};

/*************************************************************/
/* Widget on created */
/*************************************************************/
Template.WidgetStartDetails.onCreated(function() {
    var self = this;

    this.nameCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.name.max);
    this.descriptionCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.description.max);
    this.imageSystem = new ImageSystem();
    this.currentPartup = new ReactiveVar({});

    this.autorun(function () {
        var partup = Partups.findOne({ _id: Session.get('partials.start-partup.current-partup') });
        if(partup) {
            self.currentPartup.set(partup);
            self.imageSystem.uploadedImageId.set(partup.image);
            self.imageSystem.updateSuggestions(partup.tags);
        }
    });

    this.autorun(function () {
        var imageId = self.imageSystem.uploadedImageId.get();
        if(!imageId) return;

        var image = Images.findOne({ _id: imageId });
        if(!image) return;

        self.imageSystem.currentImageId.set(imageId);
        self.imageSystem.upload.set(image.url());
    });
});

/*************************************************************/
/* Widget on rendered */
/*************************************************************/
Template.WidgetStartDetails.onRendered(function() {
    Partup.ui.datepicker.applyToInput(this, '.pu-datepicker');
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartDetails.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    currentPartup: function () {
        return Template.instance().currentPartup.get();
    },
    fieldsFromPartup: function() {
        var partup = Template.instance().currentPartup.get();
        if (partup) {
            return Partup.transformers.partup.toFormStartPartup(partup);
        }
    },
    nameCharactersLeft: function(){
        return Template.instance().nameCharactersLeft.get();
    },
    descriptionCharactersLeft: function(){
        return Template.instance().descriptionCharactersLeft.get();
    },
    partupImage: function () {
        return Template.instance().imageSystem;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartDetails.events({
    'keyup [data-max]': function updateMax(event, template) {
        var max = eval($(event.target).data("max"));
        var charactersLeftVar = $(event.target).data("characters-left-var");
        template[charactersLeftVar].set(max - $(event.target).val().length);
    },
    'change [data-imageupload]': function eventChangeFile(event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                var imageId = image._id;
                Meteor.subscribe('images.one', imageId);
                template.imageSystem.uploadedImageId.set(imageId);
            });
        });
    },
    'click [data-imageremove]': function eventChangeFile(event, template) {
        template.imageSystem.unsetUploadedPicture();
    },
    'blur input[name=tags_input]': function searchFlickerByTags(event, template) {
        if (Router.current().route.path(this) !== '/start/details') return; // Only trigger this functionality on correct route
        var tags = template.$('input[name=tags_input]').val().replace(/\s/g, '').split(',');
        Template.instance().imageSystem.updateSuggestions(tags);
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
