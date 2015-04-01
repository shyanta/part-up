/**
 * Register Form Required
 * @name registerRequired
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.resetPassword = new SimpleSchema({
    password: {
        type: String,
        max: 255,
        regEx: Partup.services.validators.password
    }
});