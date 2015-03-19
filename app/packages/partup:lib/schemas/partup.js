// Define the Partup schema
Partup.schemas.partup = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    name: {
        type: String,
        max: 200
    },
    description: {
        type: String
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
    tags: {
        type: [String],
        minCount: 5
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
    uppers: {
        type: [Object]
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