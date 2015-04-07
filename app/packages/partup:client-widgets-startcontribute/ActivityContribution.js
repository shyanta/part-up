Template.ActivityContribution.created = function () {
    this.canDropdownEnabled = new ReactiveVar(false);
    this.haveDropdownEnabled = new ReactiveVar(false);
};

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
        return Template.instance().canDropdownEnabled.get() ? true : false;
    },
    'haveDropdownEnabled': function () {
        return Template.instance().haveDropdownEnabled.get() ? true : false;
    },
    'contributions': function () {
        return Contributions.find({ activity_id: this._id });
    },
    'activityHasContributions': function () {
        var contributions = Template.instance().contributions.get('fields').types;
        return contributions.length > 0;
    },
    /*
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

// Initialize beginvalue variables
var beginFirst;
var beginLast;

Template.ActivityContribution.events({

    'click [data-toggle-want]': function (event, template) {
        var $button = $(event.currentTarget);
        var $input = $button.prev();
        $input.prop("checked", !$input.prop("checked"));
        $button.closest('form').submit();
    }

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

    'keyup [data-change-contribution]': function changeContribution(event, template) {
        if (event.which === 13) {
            // Submit form when user pressed enter
            $('#' + template.data._id).submit();
        }
    },
    'click [data-clear]': function clearContribution(event, template) {
        // reset field by data key
        var valueKey = $(event.currentTarget).data("clear");
        console.log(template[valueKey]);
        template[valueKey].set(false);

        // reset input associated with the data key
        var input = template.find('input[data-change-contribution=' + valueKey + ']');
        $(input).val('');

        // Submit form to save
        $('#' + template.data._id).submit();
    }
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

            AutoForm.resetForm(this.formId);
            this.done();
            return false;
        }
    });