// Define the Activity schema
var activityBaseSchema = new SimpleSchema({
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    name: {
        type: String
    },
    created_by: {
        type: Object,
        regEx: SimpleSchema.RegEx.Id
    },
    description: {
        type: String,
        optional: true
    },
    start_date: {
        type: Date,
        optional: true
    },
    end_date: {
        type: Date,
        optional: true
    },
    contributions: {
        type: [Object],
        optional: true
    },
        "contributions.$.upper": {
            type: Object
        },
            "contributions.$.upper.name": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
            "contributions.$.upper.image": {
                type: Object,
                optional: true
            },
        "contributions.$.types": {
            type: [Object]
        },
            "contributions.$.types.$.type": {
                type: String
            },
            "contributions.$.types.$.meta_data": {
                type: Object
            },
                "contributions.$.types.$.meta_data.$.amount": {
                    type: Number,
                    min: 0,
                    optional: true
                },
                "contributions.$.types.$.description": {
                    type: String,
                    optional: true
                },
        "contributions.$.feedbacks": {
            type: [Object],
            optional: true
        },
            "contributions.feedbacks.$.upper": {
                type: Object
            },
                "contributions.feedbacks.$.upper.name": {
                    type: String,
                    regEx: SimpleSchema.RegEx.Id
                },
                "contributions.feedbacks.$.upper.image": {
                    type: Object,
                    optional: true
                },
            "contributions.feedbacks.$.rating": {
                type: Number,
                decimal: true,
                optional: true
            },
            "contributions.feedbacks.$.description": {
                type: String,
                optional: true
            },
        "contributions.$.created_at": {
            type: Date,
            defaultValue: Date.now()
        },
        "contributions.$.updated_at": {
            type: Date,
            defaultValue: Date.now()
        },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    updated_at: {
        type: Date
    }
});

// Activity entity schema
Partup.schemas.entities.activity = new SimpleSchema([activityBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    "contributions.$.upper._id": {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    "contributions.feedbacks.$.upper._id": {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
}]);

// Activity form schema
Partup.schemas.forms.activity = new SimpleSchema([activityBaseSchema, {
    //
}]);