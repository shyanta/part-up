/*************************************************************/
/* Widget initial */
/*************************************************************/
var placeholders = {
    'name': function() {
        return __('profilesettings-form-name_input-placeholder');
    },
    'location_input': function() {
        return __('profilesettings-form-location_input-placeholder');
    },
    'description': function() {
        return __('profilesettings-form-description-placeholder');
    },
    'tags_input': function() {
        return __('profilesettings-form-tags_input-placeholder');
    },
    'facebook_url': function() {
        return __('profilesettings-form-facebook_url-placeholder');
    },
    'twitter_url': function() {
        return __('profilesettings-form-twitter_url-placeholder');
    },
    'instagram_url': function() {
        return __('profilesettings-form-instagram_url-placeholder');
    },
    'linkedin_url': function() {
        return __('profilesettings-form-linkedin_url-placeholder');
    },
    'website': function() {
        return __('profilesettings-form-website-placeholder');
    },
    'phonenumber': function() {
        return __('profilesettings-form-phonenumber-placeholder');
    },
    'skype': function() {
        return __('profilesettings-form-skype-placeholder');
    }
};

Template.Profilesettings.onCreated(function() {
    var template = this;

    template.locationSelection = new ReactiveVar();

    template.autorun(function() {
        var user = Meteor.user();
        if (!user) return;

        if (user.profile && user.profile.location && user.profile.location.place_id) template.locationSelection.set(user.profile.location);
    });

    template.uploadingProfilePicture = new ReactiveVar(false);

    // uploaded picture url
    template.profilePictureUrl = new ReactiveVar('');
    template.currentImageId = new ReactiveVar('');

    // runs after image is updated
    template.autorun(function() {
        // get the current image
        var imageId = Template.instance().currentImageId.get();
        var image = Images.findOne({_id:imageId});
        if (!image) return;

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
        loadImage.src = Partup.client.url.getImageUrl(image);
    });
});

// Template.Profilesettings.onRendered(function() {
//     $('label').click(function() {

//     });
// });

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Profilesettings.helpers({
    formSchema: function() {
        return Partup.schemas.forms.profileSettings;
    },
    placeholders: function() {
        return placeholders;
    },
    profile: function() {
        var user = Meteor.user();
        return user ? user.profile : {};
    },
    profilePictureUrl: function() {
        var uploadedImageID = Template.instance().currentImageId.get();

        if (uploadedImageID) {
            var image = Images.findOne({_id: uploadedImageID});
            return image ? Partup.client.url.getImageUrl(image, '360x360') : null;
        }

        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            image = Images.findOne({_id: user.profile.image});
            if (!image) return false;
            return Partup.client.url.getImageUrl(image);
        }
    },
    fieldsFromUser: function() {
        var user = Meteor.user();
        if (user) {
            return Partup.transformers.profile.toFormProfileSettings(user);
        }
        return undefined;
    },
    uploadingProfilePicture: function() {
        return Template.instance().uploadingProfilePicture.get();
    },
    firstName: function() {
        var user = Meteor.user();
        return User(user).getFirstname();
    },
    locationLabel: function() {
        return Partup.client.strings.locationToDescription;
    },
    partupFormvalue: function() {
        return function(location) {
            return location.id;
        };
    },
    locationQuery: function() {
        return function(query, sync, async) {
            Meteor.call('google.cities.autocomplete', query, function(error, locations) {
                lodash.each(locations, function(loc) {
                    loc.value = Partup.client.strings.locationToDescription(loc);
                });
                async(locations);
            });
        };
    },
    locationSelectionReactiveVar: function() {
        return Template.instance().locationSelection;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Profilesettings.events({
    'click [data-browse-photos], touchend [data-browse-photos]': function(event, template) {
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-profile-picture-input]');
        input.click();
    },
    'change [data-profile-picture-input]': function(event, template) {
        Partup.client.uploader.eachFile(event, function(file) {

            template.uploadingProfilePicture.set(true);

            Partup.client.uploader.uploadImage(file, function(error, image) {
                if (error) {
                    Partup.client.notify.error(TAPi18n.__(error.reason));
                    template.uploadingProfilePicture.set(false);
                    return;
                }

                template.$('input[name=image]').val(image._id);
                template.currentImageId.set(image._id);

                template.uploadingProfilePicture.set(false);
            });
        });
    }
});
