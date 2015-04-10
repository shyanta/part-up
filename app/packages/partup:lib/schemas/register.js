/**
 * Register Form Required
 * @name registerRequired
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.registerRequired = new SimpleSchema({
    name: {
        type: String,
        max: 255
    },
    email: {
        type: String,
        max: 255,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        max: 255,
        regEx: Partup.services.validators.password
    },
    confirmPassword: {
        type: String,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    }
    //network: {
    //    type: String,
    //    regEx: SimpleSchema.RegEx.Id
    //}
});

/**
 * Register Form Optional
 * @name registerOptional
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.registerOptional = new SimpleSchema({
    image: {
        type:String,
        max: 255,
        optional: true
    },
    location_input: {
        type:String,
        max: 255,
        optional: true
    },
    description: {
        type:String,
        max: 255,
        optional: true
    },
    tags_input: {
        type:String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.tagsSeparatedByComma
    },
    facebook: {
        type:String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.facebookUsername
    },
    twitter: {
        type:String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.twitterUsername
    },
    instagram: {
        type:String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.instagramUsername
    },
    linkedin: {
        type:String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.linkedinUsername
    },
    website: {
        type:String,
        max: 255,
        optional: true,
        regEx: SimpleSchema.RegEx.Url
    },
    phonenumber: {
        type:String,
        max: 255,
        optional: true
    },
    skype: {
        type:String,
        max: 255,
        optional: true
    }
});
