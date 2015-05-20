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
    'toFormRegisterOptional':function(user) {
        var fields = {
            _id: user.profile._id,
            image: user.profile.image,
            description: user.profile.description,
            facebook: user.profile.facebook,
            twitter: user.profile.twitter,
            instagram: user.profile.instagram,
            linkedin: user.profile.linkedin,
            website: user.profile.website,
            phonenumber: user.profile.phonenumber,
            skype: user.profile.skype
        };

        if(user.profile.location) {
            fields.location_input = Partup.services.location.locationToLocationInput(user.profile.location);
        }

        if(user.profile.tags) {
            fields.tags_input = user.profile.tags.join(',');
        }

        return fields;
    },

    /**
     * Transform register optional form to user fields
     *
     * @memberOf partup.transformers.user
     * @param {mixed[]} fields
     */
    'fromFormRegisterOptional': function(fields) {
        var user = {
            // form fields
            'profile.image': fields.image,
            'profile.description': fields.description,
            'profile.facebook': fields.facebook,
            'profile.twitter': fields.twitter,
            'profile.instagram': fields.instagram,
            'profile.linkedin': fields.linkedin,
            'profile.phonenumber': fields.phonenumber,
            'profile.skype': fields.skype
        };
        if(fields.location_input) {
            user['profile.location'] = Partup.services.location.locationInputToLocation(fields.location_input);
        }
        if(fields.tags_input) {
            user['profile.tags'] = Partup.services.tags.tagInputToArray(fields.tags_input);
        }
        if(fields.website) {
            var url = fields.website;
            if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                url = 'http://' + url;
            }
            user['profile.website'] = url;
            if(Meteor.isClient) {
                debugger;
            }
        }
        return user;
    }

};
