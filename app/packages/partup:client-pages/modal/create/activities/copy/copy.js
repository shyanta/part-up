Template.modal_create_activities_copy.onCreated(function() {
    this.selectedPartup = new ReactiveVar();
    this.submitting = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities_copy.helpers({
    selectedPartup: function() {
        return Template.instance().selectedPartup.get();
    },
    submitting: function() {
        return Template.instance().submitting.get();
    },

    // Autocomplete field
    partupFieldPlaceholder: function() {
        return __('pages-modal-create-activities-copy-form-copy-placeholder');
    },
    onPartupAutocompleteQuery: function() {
        var exceptPartupId = Template.instance().data.partupId;
        console.log(exceptPartupId);
        return function(query, sync, async) {
            Meteor.call('partups.autocomplete', query, exceptPartupId, function(error, partups) {
                lodash.each(partups, function(p) {
                    p.value = p.name; // what to show in the autocomplete list
                });
                async(partups);
            });
        };
    },
    onPartupAutocompleteSelect: function() {
        var tpl = Template.instance();

        return function(partup) {
            tpl.selectedPartup.set(partup);

            var partup_input = tpl.find('form').elements.partup;
            partup_input.value = partup._id;
        };
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_activities_copy.events({
    'click [data-clearpartup]': function(event, template) {
        template.selectedPartup.set(undefined);
        var partup_input = template.find('form').elements.partup;

        Meteor.defer(function() {
            partup_input.value = '';

            Meteor.defer(function() {
                template.find('.tt-input[data-partupqueryinput]').focus();
            });
        });
    },
    'submit form': function(event, template) {
        event.preventDefault();

        if (template.submitting.get()) return;

        var form = event.currentTarget;
        var selectedPartup = template.selectedPartup.get();

        if (!selectedPartup) return;

        var submitting = template.submitting.set(true);
        var partupId = template.data.partupId;

        Meteor.call('activities.copy', selectedPartup._id, partupId, function(error, result) {
            if (error) {
                return Partup.client.notify.error(__('pages-modal-create-activities-error-method-' + error.error));
            }

            form.reset();
            template.submitting.set(false);
            template.selectedPartup.set(undefined);
            Partup.client.popup.close();
        });

        return false;
    }
});
