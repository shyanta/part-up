/**
 * Base Update schema
 * @name updateBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var updateBaseSchema = new SimpleSchema({
    type: {
        type: String
    },
    type_data: {
        type: Object
    },
        "type_data.new_value": {
            type: String
        },
        "type_data.old_value": {
            type: String
        },
        "type_data.upper": {
            type: Object
        },
            "type_data.upper._id": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
            "type_data.upper.image": {
                type: Object,
                optional: true
            },
            "type_data.upper.name": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            }
});

/**
 * Update entity schema
 * @name update
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.update = new SimpleSchema([updateBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    comments: {
        type: [Object],
        optional: true
    },
        "comments.$._id": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "comments.$.content": {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        "comments.$.date": {
            type: Date,
            defaultValue: Date.now()
        },
        "comments.$.upper": {
            type: Object
        },
            "comments.$.upper._id": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
            "comments.$.upper.name": {
                type: String,
                regEx: SimpleSchema.RegEx.Id
            },
    created_at: {
        type: Date,
        defaultValue: Date.now()
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