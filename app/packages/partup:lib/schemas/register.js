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
        optional: true
    },
    twitter: {
        type:String,
        max: 255,
        optional: true
    },
    instagram: {
        type:String,
        max: 255,
        optional: true
    },
    linkedin: {
        type:String,
        max: 255,
        optional: true
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
