/**
 * Register Form Required
 * @name registerRequired
 * @memberof Partup.schemas.forms
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
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.registerOptional = new SimpleSchema({
    description: {
        type: String,
        max: 650,
        optional: true
    },
    image: {
        type: String,
        max: 255,
        optional: true
    },
    facebook_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: facebookUrl
    },
    instagram_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: instagramUrl
    },
    linkedin_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: linkedinUrl
    },
    twitter_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: twitterUrl
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
    website: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol
    }
});

/**
 * Register Form Optional
 * @name profileSettings
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.profileSettings = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        max: 650,
        optional: true
    },
    image: {
        type: String,
        max: 255,
        optional: true
    },
    facebook_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: facebookUrl
    },
    instagram_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: instagramUrl
    },
    linkedin_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: linkedinUrl
    },
    twitter_url: {
        type: String,
        max: 2000,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol //TODO: twitterUrl
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
    website: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol
    }
});
