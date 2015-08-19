/**
 * Register Form Required
 * @name registerRequired
 * @memberof Partup.schemas.forms
 */
Partup.schemas.entities.settings = new SimpleSchema({
    'locale': {
        type: String,
        min: 2,
        max: 2,
        optional:true
    },
    'email': {
        type: Object,
        optional: true
    },
    'email.dailydigest': {
        type: Boolean,
        optional:true
    },
    'email.upper_mentioned_in_partup_comment': {
        type: Boolean,
        optional:true
    },
    'email.upper_mentioned_in_partup_message': {
        type: Boolean,
        optional:true
    },
    'email.invite_existing_upper_to_partup_activity': {
        type: Boolean,
        optional:true
    },
    'email.invite_user_to_partup_activity': {
        type: Boolean,
        optional:true
    },
    'email.invite_existing_upper_to_network': {
        type: Boolean,
        optional:true
    },
    'email.invite_user_to_network': {
        type: Boolean,
        optional:true
    }
});
