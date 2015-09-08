/**
 * Network bulk-invite form schema
 * @name network-bulk-invite
 * @memberof Partup.schemas.forms
 */
Partup.schemas.forms.networkBulkinvite = new SimpleSchema({
    csv_file_id: {
        type: String
    },
    message: {
        type: String,
        max: 2500,
        custom: function() {
            if (!Partup.services.validators.containsNoHtml(this.value)) {
                return 'shouldNotContainHtml';
            }

            if (!Partup.services.validators.containsRequiredTags(this.value, ['url', 'name'])) {
                return 'missingRequiredTags';
            }

            if (!Partup.services.validators.containsNoUrls(this.value)) {
                return 'shouldNotContainUrls';
            }
        }
    }
});
