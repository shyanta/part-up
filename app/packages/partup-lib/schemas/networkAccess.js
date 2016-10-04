/**
 * network create form schema
 * @name networkAccess
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.networkAccess = new SimpleSchema({
    colleagues_custom_a_enabled: {
        label: function() {
            return TAPi18n.__('network-settings-access-form-colleagues_custom_a_enabled-label');
        },
        optional: true,
        type: Boolean
    },
    colleagues_custom_b_enabled: {
        label: function() {
            return TAPi18n.__('network-settings-access-form-colleagues_custom_b_enabled-label');
        },
        optional: true,
        type: Boolean
    },
    label_admins: {
        type: String,
        optional: true,
        max: 10
    },
    label_colleagues: {
        type: String,
        optional: true,
        max: 10,
    },
    label_colleagues_custom_a: {
        type: String,
        optional: true,
        max: 10,
        custom: function() {
            var required = this.field('colleagues_custom_a_enabled').value === true;
            if (required && !this.isSet) {
                return 'required';
            }
        }
    },
    label_colleagues_custom_b: {
        type: String,
        optional: true,
        max: 10,
        custom: function() {
            var required = this.field('colleagues_custom_b_enabled').value === true;
            if (required && !this.isSet) {
                return 'required';
            }
        }
    }
});
