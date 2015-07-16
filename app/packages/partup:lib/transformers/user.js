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
            facebook_url: user.profile.facebook_url,
            twitter_url: user.profile.twitter_url,
            instagram_url: user.profile.instagram_url,
            linkedin_url: user.profile.linkedin_url,
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
            'profile.facebook_url': fields.facebook_url,
            'profile.twitter_url': fields.twitter_url,
            'profile.instagram_url': fields.instagram_url,
            'profile.linkedin_url': fields.linkedin_url,
            'profile.phonenumber': fields.phonenumber,
            'profile.website': Partup.services.website.cleanUrlToFullUrl(fields.website),
            'profile.skype': fields.skype
        };
    },
    /**
     * Transform user profile to profile settings form
     *
     * @memberof Partup.transformers.partup
     * @param {object} user
     */
    'toFormProfileSettings': function(user) {
        return {
            _id: user.profile._id,
            image: user.profile.image,
            description: user.profile.description,
            facebook_url: user.profile.facebook_url,
            twitter_url: user.profile.twitter_url,
            instagram_url: user.profile.instagram_url,
            linkedin_url: user.profile.linkedin_url,
            website: user.profile.website,
            phonenumber: user.profile.phonenumber,
            skype: user.profile.skype,
            tags_input: Partup.services.tags.tagArrayToInput(user.profile.tags),
            location_input: Partup.services.location.locationToLocationInput(user.profile.location),
            name: user.profile.name
        };
    },

    /**
     * Transform profile settings form to user fields
     *
     * @memberof Partup.transformers.user
     * @param {mixed[]} fields
     */
    'fromFormProfileSettings': function(fields) {
        return {
            // form fields
            'profile.image': fields.image,
            'profile.description': fields.description,
            'profile.tags': Partup.services.tags.tagInputToArray(fields.tags_input),
            'profile.location': Partup.services.location.locationInputToLocation(fields.location_input),
            'profile.facebook_url': fields.facebook_url,
            'profile.twitter_url': fields.twitter_url,
            'profile.instagram_url': fields.instagram_url,
            'profile.linkedin_url': fields.linkedin_url,
            'profile.phonenumber': fields.phonenumber,
            'profile.website': Partup.services.website.cleanUrlToFullUrl(fields.website),
            'profile.skype': fields.skype,
            'profile.name': fields.name
        };
    }
};
