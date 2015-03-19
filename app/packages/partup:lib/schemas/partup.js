// Define the base Partup schema
var partupBaseSchema = new SimpleSchema({
    name: {
        type: String,
        max: 200
    },
    description: {
        type: String
    },
    tags: {
        type: [String],
        minCount: 5
    },
    networks: {
        type: [Object],
        minCount: 1
    },
        "networks.$._id": {
            type: String
        },
        "networks.$.name": {
            type: String
        },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    image: {
        type: Object,
        optional: true
    },
    status: {
        type: String
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    updated_at: {
        type: Date
    }
});

Partup.schemas.entities.partup = new SimpleSchema([partupBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    location: {
        type: Object,
        optional: true
    },
        "location.city": {
            type: String
        },
        "location.country": {
            type: String
        },
    uppers: {
        type: [Object],
        optional: true
    },
        "uppers.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
    supporters: {
        type: [Object],
        optional: true
    },
        "supporters.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "supporters.$.name": {
            type: String
        },
        "supporters.$.image": {
            type: Object,
            optional: true
        },
    updates: {
        type: [Object],
        optional: true
    },
        "updates.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
    activities: {
        type: [Object],
        optional: true
    },
        "activities.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
    anticontracts: {
        type: [Object],
        optional: true
    },
        "anticontracts.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "anticontracts.$.activities": {
            type: [Object]
        },
        // TODO copy activity state
        "anticontracts.$.signed_by_all": {
            type: Boolean
        },
        "anticontracts.$.uppers_signed": {
            type: [Object],
            optional: true
        },
            "anticontracts.$.uppers_signed.$._id": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
            "anticontracts.$.uppers_signed.$.name": {
                type: String
            },
            "anticontracts.$.uppers_signed.$.image": {
                type: Object,
                optional: true
            },
            "anticontracts.$.uppers_signed.$.date": {
                type: Date
            }
}]);

Partup.schemas.forms.startPartup = new SimpleSchema([partupBaseSchema, {
    // Take it away Pete!
}]);