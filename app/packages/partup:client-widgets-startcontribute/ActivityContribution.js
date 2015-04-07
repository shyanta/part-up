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
    /*
    'activityHasContributions': function () {
        var contributions = Template.instance().contributions.get('fields').types;
        return contributions.length > 0;
    },
    'currentUpperContribution': function () {
        return Contributions.find({ activity_id: this._id, upper_id: Meteor.user()._id });
    },
    'contributeWantValue': function () {
        return Template.instance().contributeWantChecked.get() ? 1 : 0;
    },
    'contributeWantChecked': function () {
        return Template.instance().contributeWantChecked.get() ? 'checked' : '';
    },
    'contributeCanChecked': function () {
        return Template.instance().contributeCanChecked.get() ? 'checked' : '';
    },
    'contributeHaveChecked': function () {
        return Template.instance().contributeHaveChecked.get() ? 'checked' : '';
    },
    */
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
        var $canEnabled = $button.closest('.pu-popover').find('[name="types_can_enabled"]');

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


/*

    'click [data-change-contribution]': function stopFromBubbling(event, template) {
        // prevent autofocus(clickContribution) on click
        event.stopPropagation();
    },
    'click [data-open-contribution]': function clickContribution(event, template) {
        // show the popover on click

        // prevent any form actions and checkbox selections
        event.preventDefault();

        // Temporarily save the begin values
        beginFirst = $(event.currentTarget).find('input[data-change-contribution]:first').val();
        beginLast = $(event.currentTarget).find('input[data-change-contribution]:last').val();

        // focus on the first input field
        $(event.currentTarget).find('input[data-change-contribution]:first').focus();

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("open-contribution");

        // set reactive var boolean to true to open popover
        template[booleanKey].set(true)
    },
    //'mouseenter [data-open-contribution]': function mouseEnterContribution(event, template) {
    //    // this event handler does almost the same as the
    //    // click handler, except it's on hover and with a delay
    //    var booleanKey = $(event.currentTarget).data("open-contribution");
    //
    //    // Temporarily save the begin values
    //    beginFirst = $(event.currentTarget).find('input[data-change-contribution]:first').val();
    //    beginLast = $(event.currentTarget).find('input[data-change-contribution]:last').val();
    //
    //    if (!template[booleanKey].get()) {
    //        template.showTimeout = Meteor.setTimeout(function () {
    //            template[booleanKey].set(true);
    //        }, 1000);
    //    }
    //},

    'mouseleave [data-open-contribution]': function mouseLeaveContribution(event, template) {
        // hide the popover on mouse leave

        // Submit form to save values if changed
        var endFirst = $(event.currentTarget).find('input[data-change-contribution]:first').val();
        var endLast = $(event.currentTarget).find('input[data-change-contribution]:last').val();
        if (beginFirst !== endFirst || beginLast !== endLast) {
            $('#' + template.data._id).submit();
        }

        // blur input fields to prevent accidental input change by user
        $(event.currentTarget).find('input[data-input-contribution]').blur();

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("open-contribution");

        // cancel any timeout that will show the current popover
        Meteor.clearTimeout(template.showTimeout);

        // set reactive var boolean to false to hide popover
        template[booleanKey].set(false);
    },
    */
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