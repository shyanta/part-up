/**
 * Base Contribution schema
 * @name contributionBaseSchema
 * @memberof Partup.schemas
 * @private
 */
var contributionBaseSchema = new SimpleSchema({
    hours: {
        type: Number,
        min: 0,
        optional: true
    },
    rate: {
        type: Number,
        min: 0,
        optional: true
    }
});

/**
 * Contribution entity schema
 * @name contribution
 * @memberof Partup.schemas.entities
 */
Partup.schemas.entities.contribution = new SimpleSchema([contributionBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    activity_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    archived: {
        type: Boolean,
        defaultValue: false
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    },
    partup_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    update_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    updated_at: {
        type: Date,
        defaultValue: Date.now()
    },
    upper_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    verified: {
        type: Boolean,
        defaultValue: false
    }
}]);

/**
 * Contribution Form
 * @name contribute
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.contribution = new SimpleSchema([contributionBaseSchema, {
    //
}]);
