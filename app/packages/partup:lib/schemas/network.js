/**
 * Base Network schema
 * @name networkBaseSchema
 * @memberof Partup.schemas
 * @private
 */
var networkBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max: 250
    },
    icon: {
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
 * @memberof Partup.schemas.entities
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
    location: {
        type: Object,
        optional: true
    },
    partups: {
        type: [String],
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    },
    pending_uppers: {
        type: [Object],
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
    tags: {
        type: [String],
        minCount: 1
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
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.network = new SimpleSchema([networkBaseSchema, {
    location_input: {
        type: String,
        max: 255
    },
    tags_input: {
        type: String,
        max: 255,
        regEx: Partup.services.validators.tagsSeparatedByComma
    }
}]);

/**
 * network create form schema
 * @name networkCreate
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.networkCreate = new SimpleSchema([Partup.schemas.forms.network, {
    privacy_type: {
        type: Number,
        min: 1,
        max: 3
    }
}]);
