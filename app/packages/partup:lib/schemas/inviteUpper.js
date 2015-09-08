/**
 * New message Form
 * @name inviteUpper
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.inviteUpper = new SimpleSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        max: 255,
        regEx: Partup.services.validators.email
    }
    // message: {
    //     type: String,
    //     max: 250
    // },
});
