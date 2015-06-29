/**
 @namespace Profile transformer service
 @name partup.transformers.profile
 @memberof Partup.transformers
 */
Partup.transformers.profile = {
    /**
     * Transform user profile to optional details form
     *
     * @memberof Partup.transformers.partup
     * @param {object} user
     */
    'toFormRegisterOptional': function(user) {
        return {
            _id: user.profile._id,
            image: user.profile.image,
            description: user.profile.description,
            facebook: user.profile.facebook,
            twitter: user.profile.twitter,
            instagram: user.profile.instagram,
            linkedin: user.profile.linkedin,
            website: user.profile.website,
            phonenumber: user.profile.phonenumber,
            skype: user.profile.skype,
            tags_input: Partup.services.tags.tagArrayToInput(user.profile.tags),
            location_input: Partup.services.location.locationToLocationInput(user.profile.location)
        };
    },

    /**
     * Transform register optional form to user fields
     *
     * @memberof Partup.transformers.user
     * @param {mixed[]} fields
     */
    'fromFormRegisterOptional': function(fields) {
        return {
            // form fields
            'profile.image': fields.image,
            'profile.description': fields.description,
            'profile.tags': Partup.services.tags.tagInputToArray(fields.tags_input),
            'profile.location': Partup.services.location.locationInputToLocation(fields.location_input),
            'profile.facebook': fields.facebook,
            'profile.twitter': fields.twitter,
            'profile.instagram': fields.instagram,
            'profile.linkedin': fields.linkedin,
            'profile.phonenumber': fields.phonenumber,
            'profile.website': Partup.services.website.cleanUrlToFullUrl(fields.website),
            'profile.skype': fields.skype
        };
    }
};
