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
        max: 255
    },
    password: {
        type: String,
        max: 255
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
        max: 255
    },
    location_input: {
        type:String,
        max: 255
    },
    description: {
        type:String,
        max: 255
    },
    tags_input: {
        type:String,
        max: 255
    },
    facebook: {
        type:String,
        max: 255
    },
    twitter: {
        type:String,
        max: 255
    },
    instagram: {
        type:String,
        max: 255
    },
    linkedin: {
        type:String,
        max: 255
    },
    website: {
        type:String,
        max: 255
    },
    phonenumber: {
        type:String,
        max: 255
    },
    skype: {
        type:String,
        max: 255
    }
});
