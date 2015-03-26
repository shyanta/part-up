/**
 * Contribute Form
 * @name contribute
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.contribute = new SimpleSchema({
    type_want: {
        type: Boolean,
        optional: true
    },
    type_can_amount: {
        type: Number,
        optional: true
    },
    type_have_amount: {
        type: Number,
        optional: true
    },
    type_have_description: {
        type: String,
        max: 255,
        optional: true
    }
});