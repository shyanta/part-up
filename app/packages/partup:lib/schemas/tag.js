/**
 * Base Tag schema
 * @name tagBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var tagBaseSchema = new SimpleSchema({
    _id: {
        type: String,
        max: 50
    }
});

/**
 * Tag entity schema
 * @name tag
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.tag = new SimpleSchema([tagBaseSchema, {
    count: {
        type: Number,
        min: 0
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    }
}]);

/**
 * tag form schema
 * @name tag
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.tag = new SimpleSchema([tagBaseSchema, {
    //
}]);