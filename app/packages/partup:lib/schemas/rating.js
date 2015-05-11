/**
 * Rating Form
 * @name rating
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.rating = new SimpleSchema({
    rating: {
        type: Number,
        min: 1,
        max: 100
    },
    feedback: {
        type: String,
        optional: true
    }
});