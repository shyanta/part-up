/**
 * ContentBlock form schema
 * @name contentBlock
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.contentBlock = new SimpleSchema({
    title: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    text: {
        type: String,
        max: 999,
        optional: true
    },
    images: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    type: {
        type: String,
        allowedValues: ['paragraph']
    }
});
