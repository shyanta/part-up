/**
 * Base Partup schema
 * @name partupBaseSchema
 * @memberof Partup.schemas
 * @private
 */
var partupBaseSchema = new SimpleSchema({
    description: {
        type: String,
        max: 250
    },
    budget_type: {
        type: String,
        allowedValues: ['money', 'hours'],
        optional: true
    },
    budget_money: {
        type: Number,
        min: 0,
        optional: true,
        custom: function() {
            var required = this.field('budget_type').value === 'money';
            if (required && !this.isSet) {
                return 'required';
            }
        }
    },
    budget_hours: {
        type: Number,
        min: 0,
        optional: true,
        custom: function() {
            var required = this.field('budget_type').value === 'hours';
            if (required && !this.isSet) {
                return 'required';
            }
        }
    },
    end_date: {
        type: Date,
        min: function() {
            var timezone = new Date().getTimezoneOffset() / 60;
            return new Date(new Date().setHours(-timezone, 0, 0, 0));
        }
    },
    name: {
        type: String,
        max: 60
    },
    image: {
        type: String,
        optional: true
    },
    network_id: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Id
    }
});

/**
 * Partup entity schema
 * @name partup
 * @memberof Partup.schemas.entities
 */
Partup.schemas.entities.partup = new SimpleSchema([partupBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    activity_count: {
        type: Number,
        defaultValue: 0
    },
    created_at: {
        type: Date,
        defaultValue: new Date()
    },
    creator_id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    location: {
        type: Object,
        optional: true
    },
    'location.city': {
        type: String
    },
    'location.country': {
        type: String
    },
    privacy_type: {
        type: Number,
        min: 1,
        max: 5
    },
    start_date: {
        type: Date
    },
    status: {
        type: String
    },
    supporters: {
        type: [String],
        optional: true,
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
 * start partup form schema
 * @name partupUpdate
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.partupUpdate = new SimpleSchema([partupBaseSchema, {
    focuspoint_x_input: {
        type: Number,
        min: 0,
        max: 1,
        decimal: true,
        optional: true
    },
    focuspoint_y_input: {
        type: Number,
        min: 0,
        max: 1,
        decimal: true,
        optional: true
    },
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
 * start partup create form schema
 * @name partupCreate
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.partupCreate = new SimpleSchema([Partup.schemas.forms.partupUpdate, {
    privacy_type_input: {
        type: String,
        allowedValues: [
            'public',
            'private',
            'network'
        ]
    },
}]);
