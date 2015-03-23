/**
 * Base Partup schema
 * @name partupBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var partupBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max:140
    },
    end_date: {
        type: Date
    },
    name: {
        type: String,
        max: 40
    }
});

/**
 * Partup entity schema
 * @name partup
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.partup = new SimpleSchema([partupBaseSchema, {
    _id: {
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
            "anticontracts.$.uppers_signed.$.date": {
                type: Date
            },
            "anticontracts.$.uppers_signed.$.image": {
                type: Object,
                optional: true
            },
            "anticontracts.$.uppers_signed.$.name": {
                type: String
            },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    creator_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    image: {
        type: String,
        optional: true
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
    network: {
        type: Object
    },
        "network._id": {
            type: String
        },
        "network.name": {
            type: String
        },
    start_date: {
        type: Date
    },
    status: {
        type: String
    },
    supporters: {
        type: [Object],
        optional: true
    },
        "supporters.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "supporters.$.image": {
            type: Object,
            optional: true
        },
        "supporters.$.name": {
            type: String
        },
    tags: {
        type: [String],
        minCount: 1
    },
    updated_at: {
        type: Date,
        defaultValue: Date.now()
    },
    uppers: {
        type: [Object],
        optional: true
    },
        "uppers.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
}]);

/**
 * start partup form schema
 * @name startPartup
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.startPartup = new SimpleSchema([partupBaseSchema, {
    location_input: {
        type:String,
        max: 255
    },
    tags_input: {
        type: String,
        max: 255
    }
}]);
