/**
 @namespace Profile transformer service
 @name partup.transformers.profile
 @memberOf partup.transformers
 */
Partup.transformers.profile = {

    /**
     * Transform user profile to optional details form
     *
     * @memberOf partup.transformers.partup
     * @param {object} user
     */
    'toFormOptional':function(user) {
        return {
            _id: user.profile._id,
            location_input: Partup.services.partup.locationToLocationInput(user.profile.location),
            description: partup.description,
            tags_input: partup.tags.join(','),
            facebook: user.profile.facebook,
            twitter: user.profile.twitter,
            instagram: user.profile.instagram,
            linkedin: user.profile.linkedin,
            website: user.profile.website,
            skype: user.profile.skype

        };
    },

    /**
     * Transform register optional form to user fields
     *
     * @memberOf partup.transformers.user
     * @param {mixed[]} fields
     */
    'fromFormRegisterOptional': function(fields) {
        return {
            // form fields
            'profile.location': {
                city: fields.location_input
            },
            'profile.description': fields.description,
            'profile.tags': fields.tags_input.split(','),
            'profile.facebook': fields.facebook,
            'profile.twitter': fields.twitter,
            'profile.instagram': fields.instagram,
            'profile.linkedin': fields.linkedin,
            'profile.website': fields.website,
            'profile.skype': fields.skype
        }
    }

};
