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
 * Base Comment Update schema
 * @name updateCommentBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var updateCommentBaseSchema = new SimpleSchema({
    content: {
        type: String,
        max: 250
    }
});

/**
 * Update Comment entity schema
 * @name updateComment
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.updateComment = new SimpleSchema([updateCommentBaseSchema, {
    _id: {
        type: String
    },
    creator: {
        type: Object
    },
        "creator._id": {
            type: String
        },
        "creator.name": {
            type: String
        },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    }
}]);

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
        type: [Partup.schemas.entities.updateComment],
        optional: true
    },
    comments_count: {
        type: Number,
        defaultValue: 0
    },
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    }
}]);

/**
 * Insert Update Comment form schema
 * @name updateComment
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.updateComment = new SimpleSchema([updateCommentBaseSchema]);
