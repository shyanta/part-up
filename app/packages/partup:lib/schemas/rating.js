/**
 * Activity entity schema
 * @name activity
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.rating = new SimpleSchema([activityBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    activity_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    contribution_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    feedback: {
        type: String,
        optional: true
    },
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    rating: {
        type: Number,
        decimal: true,
        optional: true
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    },
    upper_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
}]);

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