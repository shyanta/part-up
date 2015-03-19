// Define the Activity schema
Partup.schemas.activity = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
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
        type: String
    },
    start_date: {
        type: Date
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
            "contributions.$.upper._id": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
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
                    min: 0
                },
                "contributions.$.types.$.description": {
                    type: String,
                    optional: true
                },
        "contributions.$.feedbacks": {
            type: [Object]
        },
            "contributions.feedbacks.$.upper": {
                type: Object
            },
                "contributions.feedbacks.$.upper._id": {
                    type: String,
                    regEx: SimpleSchema.RegEx.Id
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
            type: Date
        },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    updated_at: {
        type: Date
    }
});