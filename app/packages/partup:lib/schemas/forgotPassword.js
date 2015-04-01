/**
 * Forgot password Form
 * @name forgotPassword
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.forgotPassword = new SimpleSchema({
    email: {
        type: String,
        max: 255,
        regEx: SimpleSchema.RegEx.Email
    }
});