/**
 * Register Form Required
 * @name registerRequired
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.registerRequired = new SimpleSchema({
    confirmPassword: {
        type: String,
        custom: function() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    },
    email: {
        type: String,
        max: 255,
        regEx: SimpleSchema.RegEx.Email
    },
    name: {
        type: String,
        max: 255
    },
    password: {
        type: String,
        max: 255,
        regEx: Partup.services.validators.password
    },
    networks: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

/**
 * Register Form Optional
 * @name registerOptional
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.registerOptional = new SimpleSchema({
    completeness: {
        type: Number,
        min: 0,
        max: 100,
        optional: true,
        defaultValue: 0
    },
    description: {
        type: String,
        max: 650,
        optional: true
    },
    facebook: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.facebookUsername
    },
    image: {
        type: String,
        max: 255,
        optional: true
    },
    instagram: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.instagramUsername
    },
    linkedin: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.linkedinUsername
    },
    location_input: {
        type: String,
        max: 255,
        optional: true
    },
    phonenumber: {
        type: String,
        max: 255,
        optional: true
    },
    skype: {
        type: String,
        max: 255,
        optional: true
    },
    tags_input: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.tagsSeparatedByComma
    },
    twitter: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.twitterUsername
    },
    website: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol
    }
});
