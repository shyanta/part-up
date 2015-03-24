/**
 * Contribute Form
 * @name contribute
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.contribute = new SimpleSchema({
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