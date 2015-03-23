/**
 * Base Activity schema
 * @name partupBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var activityBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max: 500,
        optional: true
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
        type: [Object],
        optional: true
    },
        "contributions.$.created_at": {
            type: Date,
            defaultValue: Date.now()
        },
        "contributions.$.feedbacks": {
            type: [Object],
            optional: true
        },
            "contributions.feedbacks.$.description": {
                type: String,
                optional: true
            },
            "contributions.feedbacks.$.rating": {
                type: Number,
                decimal: true,
                optional: true
            },
            "contributions.feedbacks.$.upper": {
                type: Object
            },
                "contributions.feedbacks.$.upper._id": {
                    type: String,
                    regEx: SimpleSchema.RegEx.Id
                },
                "contributions.feedbacks.$.upper.image": {
                    type: Object,
                    optional: true
                },
                "contributions.feedbacks.$.upper.name": {
                    type: String,
                    regEx: SimpleSchema.RegEx.Id
                },
        "contributions.$.types": {
            type: [Object]
        },
            "contributions.$.types.$.type": {
                type: String
            },
            "contributions.$.types.$.type_data": {
                type: Object
            },
                "contributions.$.types.$.type_data.amount": {
                    type: Number,
                    min: 0,
                    optional: true
                },
                "contributions.$.types.$.type_data.description": {
                    type: String,
                    optional: true
                },
        "contributions.$.updated_at": {
            type: Date,
            defaultValue: Date.now()
        },
        "contributions.$.upper": {
            type: Object
        },
            "contributions.$.upper._id": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
            "contributions.$.upper.image": {
                type: Object,
                optional: true
            },
            "contributions.$.upper.name": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    created_by: {
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