var canDropdownEnabledValues = new ReactiveDict();
var haveDropdownEnabledValues = new ReactiveDict();

Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribution,
    'placeholders': Partup.services.placeholders.startcontribute,
    'generateFormId': function () {
        return 'contributionEditForm-' + this._id;
    },
    'fieldsFromContribution': function () {
        var contribution = Contributions.findOne({activity_id: this._id, upper_id: Meteor.user()._id});
        return Partup.transformers.contribution.toFormContribution(contribution);
    },
    'canDropdownEnabled': function () {
        return canDropdownEnabledValues.get(this._id);
    },
    'haveDropdownEnabled': function () {
        return haveDropdownEnabledValues.get(this._id);
    },
    'contributions': function () {
        return Contributions.find({ activity_id: this._id });
    },
    'validContributionExists': function() {
        var contribution = Contributions.findOne(this._id);
        return contribution.types.want.enabled || contribution.types.can.enabled || contribution.types.have.enabled;

    },
    userImage: function () {
        var user = Meteor.users.findOne(this.upper_id);
        if (user && user.profile && user.profile.image) {
            return Images.findOne({_id: user.profile.image});
        }
    }
});

var updateStatesForForm = function (form) {
    // todo: check states for form, update them
};

Template.ActivityContribution.events({

    // Toggle 'want' button handler
    'click [data-toggle-want]': function (event, template) {
        var form = template.find('#contributionEditForm-' + this._id);                        // get form
        form.elements.types_want_enabled.checked = !form.elements.types_want_enabled.checked; // toggle 'want' checkbox
        // $(form).submit();
    },

    // Empty field button handler
    'click [data-empty-field]': function (event, template) {
        var form = template.find('#contributionEditForm-' + this._id);        // get form
        var fieldName = event.currentTarget.getAttribute('data-empty-field'); // get fieldname to empty
        form.elements[fieldName].value = '';                                  // empty field
        // $(form).submit();
    },

    // Open can-popover
    'click [data-toggle-can]': function (event, template) {
        var form = template.find('#contributionEditForm-' + this._id); // get form
        var newState = !canDropdownEnabledValues.get(this._id);        // define new state
        canDropdownEnabledValues.set(this._id, newState);              // set new state
        if(newState) form.elements.types_can_amount.focus();           // focus first field
    },

    // Open have-popover
    'click [data-toggle-have]': function (event, template) {
        var form = template.find('#contributionEditForm-' + this._id); // get form
        var newState = !haveDropdownEnabledValues.get(this._id);       // define new state
        haveDropdownEnabledValues.set(this._id, newState);             // set new state
        if(newState) form.elements.types_have_amount.focus();          // focus first field
    },


    'keyup [name="types_can_amount"]': function (event) {
        var $input = $(event.currentTarget);
        // Submit form when user pressed enter
        if (event.which === 13) {
            $input.closest('form').submit();
        }
    },
    'keyup [name="types_have_amount"]': function (event) {
        var $input = $(event.currentTarget);
        // Submit form when user pressed enter
        if (event.which === 13) {
            $input.closest('form').submit();
        }
    },
    'keyup [name="types_have_description"]': function (event) {
        var $input = $(event.currentTarget);
        // Submit form when user pressed enter
        if (event.which === 13) {
            $input.closest('form').submit();
        }
    }
});

AutoForm.addHooks(
    null, {
        onSubmit: function (doc) {
            var self = this;
            var formNameParts = self.formId.split('-');
            if(formNameParts.length !== 2 || formNameParts[0] !== 'contributionEditForm') {
                return false;
            }

            var activityId = formNameParts[1];
            var contribution = Contributions.findOne({ activity_id: activityId, upper_id: Meteor.user()._id });
            if (contribution) {
                var contributionId = contribution._id;
                Meteor.call('contributions.update', contributionId, doc, function (error, updatedContribution) {
                    if (error) {
                        Partup.ui.notify.iError(error.reason);
                        return false;
                    }
                });
            } else {
                Meteor.call('contributions.insert', activityId, doc, function (error, newContribution) {
                    if (error) {
                        Partup.ui.notify.iError(error.reason);
                        return false;
                    }
                });
            }
            canDropdownEnabledValues.set(activityId, false);
            haveDropdownEnabledValues.set(activityId, false);

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
    });