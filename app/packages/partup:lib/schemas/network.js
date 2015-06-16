/**
 * Base Network schema
 * @name networkBaseSchema
 * @memberOf partup.schemas
 * @private
 */
var networkBaseSchema = new SimpleSchema({
    access_level: {
        type: Number,
        min: 1,
        max: 3
    },
    description: {
        type: String,
        max: 250
    },
    location: {
        type: Object,
        optional: true
    },
    'location.city': {
        type: String,
        optional: true
    },
    'location.country': {
        type: String,
        optional: true
    },
    image: {
        type: String,
        optional: true
    },
    name: {
        type: String,
        max: 150
    },
    tags: {
        type: [String],
        minCount: 1
    },
    website: {
        type: String,
        max: 255,
        optional: true,
        regEx: Partup.services.validators.simpleSchemaUrlWithoutProtocol
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
    admin_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    invites: {
        type: [Object],
        optional: true
    },
    partups: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    pending_uppers: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    'pending_uppers._id': {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    'pending_uppers.invited_at': {
        type: Date,
        defaultValue: new Date()
    },
    'pending_uppers.invited_by_id': {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    updated_at: {
        type: Date,
        defaultValue: new Date()
    },
    uppers: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
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
