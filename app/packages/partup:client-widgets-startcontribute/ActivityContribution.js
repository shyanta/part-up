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

Template.ActivityContribution.events({

    'click [data-toggle-want]': function (event) {
        var $button = $(event.currentTarget);
        var $input = $button.prev();
        $input.prop("checked", !$input.prop("checked"));
        $button.closest('form').submit();
    },

    'click [data-toggle-can]': function (event, template) {
        var $button = $(event.currentTarget);
        var $input = $button.prev();

        if(canDropdownEnabledValues.get(this._id)) {
            canDropdownEnabledValues.set(this._id, false);
        } else {
            $input.prop("checked", true);
            canDropdownEnabledValues.set(this._id, true);
            var $canAmount = $button.parent().find('[name="types_can_amount"]');
            $canAmount.focus();
        }
    },
    'click [data-remove-can]': function (event, template) {
        var $button = $(event.currentTarget);
        var $amountInput = $button.prev();
        var $canEnabled = $button.parent().parent().find('[name="types_can_enabled"]');

        // clear "can" contribution
        $canEnabled.prop("checked", false);
        $amountInput.val(undefined);
        canDropdownEnabledValues.set(this._id, false);
        $button.closest('form').submit();
    },
    'keyup [name="types_can_amount"]': function (event) {
        var $input = $(event.currentTarget);
        // Submit form when user pressed enter
        if (event.which === 13) {
            $input.closest('form').submit();
        }
    },

    'click [data-toggle-have]': function (event, template) {
        var $button = $(event.currentTarget);
        var $input = $button.prev();

        if(haveDropdownEnabledValues.get(this._id)) {
            haveDropdownEnabledValues.set(this._id, false);
        } else {
            $input.prop("checked", true);
            haveDropdownEnabledValues.set(this._id, true);
            var $haveAmount = $button.parent().find('[name="types_have_amount"]');
            $haveAmount.focus();
        }
    },
    'click [data-remove-have]': function (event, template) {
        var $button = $(event.currentTarget);
        var $amountInput = $button.prev();
        var $descriptionInput = $button.parent().parent().find('[name="types_have_description"]');
        var $haveEnabled = $button.parent().parent().find('[name="types_have_enabled"]');

        // clear "have" contribution
        $haveEnabled.prop("checked", false);
        $amountInput.val(undefined);
        $descriptionInput.val(undefined);
        haveDropdownEnabledValues.set(this._id, false);
        $button.closest('form').submit();
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
            if(formNameParts.length !== 2 || formNameParts[0] !== 'contributionEditForm') return;

            self.event.preventDefault();

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