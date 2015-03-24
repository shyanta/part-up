/**
 * Contribute Form Required
 * @name contributeRequired
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.contributeRequired = new SimpleSchema({
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
});

/**
 * Contribute Form Optional
 * @name contributeOptional
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.contributeOptional = new SimpleSchema({

});