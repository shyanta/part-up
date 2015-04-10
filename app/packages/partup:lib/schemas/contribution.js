/**
 * Base Contribution schema
 * @name contributionBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var contributionBaseSchema = new SimpleSchema({
    //
});

/**
 * Contribution entity schema
 * @name contribution
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.contribution = new SimpleSchema([contributionBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    activity_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    feedbacks: {
        type: [Object],
        optional: true
    },
        "feedbacks.$.description": {
            type: String,
            optional: true
        },
        "feedbacks.$.rating": {
            type: Number,
            decimal: true,
            optional: true
        },
        "feedbacks.$.upper_id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    types: {
        type: [Object]
    },
        "types.$.type": {
            type: String
        },
        "types.$.type_data": {
            type: Object
        },
            "types.$.type_data.amount": {
                type: Number,
                min: 0,
                optional: true
            },
            "types.$.type_data.description": {
                type: String,
                optional: true
            },
    updated_at: {
        type: Date,
        defaultValue: Date.now()
    },
    upper_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
}]);

/**
 * Contribution Form
 * @name contribute
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.contribution = new SimpleSchema({

    // want
    types_want_enabled: {
        type: Boolean,
        optional: true
    },

    // can
    types_can_amount: {
        type: Number,
        optional: true
    },

    // have
    types_have_amount: {
        type: Number,
        optional: true
    },
    types_have_description: {
        type: String,
        max: 255,
        optional: true
    }
});