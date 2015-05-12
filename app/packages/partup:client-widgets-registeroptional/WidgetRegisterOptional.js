/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetRegisterOptional.onCreated(function(){
    var template = this;

    template.uploadingProfilePicture = new ReactiveVar(false);

    // uploaded picture url
    template.profilePictureUrl = new ReactiveVar('');

    // runs after image is updated
    template.autorun(function(){
        // get the current image
        var image = Images.findOne({_id:Session.get('partials.register-optional.uploaded-image')});
        if(!image) return;

        // load image from url
        var loadImage = new Image;
        loadImage.onload = function() {
            // this = image
            var src = this.src;

            // set image url
            template.profilePictureUrl.set(src);
            // set loading false
            template.uploadingProfilePicture.set(false);
        };
        // set image url to be loaded
        loadImage.src = image.url();
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRegisterOptional.helpers({
    formSchema: Partup.schemas.forms.registerOptional,
    placeholders: Partup.services.placeholders.registerOptional,
    profile: function() {
        var user = Meteor.user();
        return user ? user.profile : {};
    },
    profilePictureUrl: function() {
        var uploadedImageID = Session.get('partials.register-optional.uploaded-image');

        if (uploadedImageID) {
            var image = Images.findOne({ _id: uploadedImageID });
            return image ? image.url() : null;
        }

        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({ _id: user.profile.image }).url();
        }
    },
    fieldsFromUser: function() {
        var user = Meteor.user();
        if (user) {
            return Partup.transformers.profile.toFormRegisterOptional(user);
        }
        return undefined;
    },
    uploadingProfilePicture: function(){
        return Template.instance().uploadingProfilePicture.get();
    },
    firstName: function(){
        var user = Meteor.user();
        if(!user) return false;
        var username = mout.object.get(user, 'profile.name') || mout.object.get(user, 'name');
        return Partup.ui.strings.firstName(username);
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetRegisterOptional.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template){
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-profile-picture-input]');
        input.click();
    },
    'change [data-profile-picture-input]': function eventChangeFile(event, template){
        template.uploadingProfilePicture.set(true);
        
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (error, image) {
                template.$('input[name=image]').val(image._id);
                Meteor.subscribe('images.one', image._id);
                Session.set('partials.register-optional.uploaded-image', image._id);
                // template.uploadingProfilePicture.set(false);
            });
        });
    }
});


/*************************************************************/
/* Widget functions */
/*************************************************************/
var continueRegister = function() {
    
    // Execute intent callback
    Partup.ui.modal.executeIntentCallback('register');
    
};


/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    registerOptionalForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Meteor.call('users.update', insertDoc, function(error, res){
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

                self.done();
                continueRegister();
            });

            return false;
        }
    }
});
