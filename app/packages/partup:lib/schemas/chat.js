/**
 * Base Chat schema
 * @name chatBaseSchema
 * @memberof Partup.schemas
 * @private
 */
var chatBaseSchema = new SimpleSchema({
    //
});

/**
 * Chat entity schema
 * @name chat
 * @memberof Partup.schemas.entities
 */
Partup.schemas.entities.chat = new SimpleSchema([chatBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    started_typing: {
        type: [Object]
    },
    'started_typing.$.upper_id': {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    'started_typing.$.date': {
        type: Date,
        defaultValue: new Date()
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    }
}]);

/**
 * Chat form schema
 * @name chat
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.chat = new SimpleSchema([chatBaseSchema, {
    //
}]);
