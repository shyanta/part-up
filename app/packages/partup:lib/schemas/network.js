/**
 * Base Network schema
 * @name networkBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var networkBaseSchema = new SimpleSchema({
    name: {
        type: String,
        max: 150
    }
});

/**
 * Network entity schema
 * @name network
 * @memberOf partup.schemas.entities
 */
Partup.schemas.entities.network = new SimpleSchema([networkBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    }
}]);

/**
 * network form schema
 * @name network
 * @memberOf partup.schemas.forms
 */
Partup.schemas.forms.network = new SimpleSchema([networkBaseSchema, {
    //
}]);
