/**
 * Base Activity schema
 * @name activityBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var activityBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max: 500
    },
    end_date: {
        type: Date,
        optional: true
    },
    name: {
        type: String,
        max: 250
    },
    start_date: {
        type: Date,
        optional: true
    }
});

/**
 * Activity entity schema
 * @name activity
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.activity = new SimpleSchema([activityBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    contributions: {
        type: [String],
        optional: true
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    creator_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    updated_at: {
        type: Date,
        defaultValue: Date.now()
    }
}]);

/**
 * Activity form schema
 * @name startActivities
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.startActivities = new SimpleSchema([activityBaseSchema, {
    //
}]);