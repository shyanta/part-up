Template.MultiInviteInput.events({
    'keyup [data-inputrow]': function(event, template) {
        event.preventDefault();
        var inputs = template.$('input');
        var allHaveValues = true;
        _.each(inputs, function(item) {
            if (!$(item).val()) allHaveValues = false;
        });
        var last = $(event.currentTarget).data('inputrow');
        if (allHaveValues && last) AutoForm.addArrayItem(template.data.formId, template.data.fieldName);
    },
    'click [data-remove]': function(event, template) {
        event.preventDefault();
        var first = $(event.currentTarget).data('first');
        var last = $(event.currentTarget).data('last');
        if (last && first) {
            var inputs = template.$('input');
            _.each(inputs, function(item) {
                $(item).val(undefined);
            });
        } else {
            AutoForm.removeArrayItem(template.data.formId, template.data.fieldName, this.index);
            _.defer(function() {
                template.$('[data-null-value]').remove();
            });
        }
    }
});
