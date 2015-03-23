/**
 * Register Form Required
 * @name registerRequired
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.registerrequired = new SimpleSchema({
    name: {
        type:String,
        max: 255
    },
    email: {
        type: String,
        max: 255
    },
    password: {
        type: String,
        max: 255
    },
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
Partup.schemas.forms.registeroptional = new SimpleSchema({

});