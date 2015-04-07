Template.ActivityContribution.created = function () {
    this.contributions = new ReactiveDict();

    // contribute want init values
    this.contributeWantChecked = new ReactiveVar(false);

    // contribute can init values
    this.showCanContribute = new ReactiveVar(false);
    this.contributeCanChecked = new ReactiveVar(false);
    this.contributeCanAmount = new ReactiveVar(false);

    // contribute have init values
    this.showHaveContribute = new ReactiveVar(false);
    this.contributeHaveChecked = new ReactiveVar(false);
    this.contributeHaveAmount = new ReactiveVar(false);
    this.contributeHaveDescription = new ReactiveVar(false);
};

Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribution,
    'placeholders': Partup.services.placeholders.startcontribute,
    'formId': function () {
        return this._id;
    },
    'fieldsFromContribution': function () {
        console.log(this);
        var contribution = Contributions.findOne({activity_id: this._id, upper_id: Meteor.user()._id});
        if (contribution) {
            Template.instance().contributions.set('fields', contribution);
            var fields = Partup.transformers.contribution.toFormContribution(Template.instance().contributions.get('fields'));
            if (fields.type_want) {
                Template.instance().contributeWantChecked.set(true);
            }
            if (fields.type_can) {
                Template.instance().contributeCanChecked.set(true);
                Template.instance().contributeCanAmount.set(fields.type_can_amount);
            }
            if (fields.type_have) {
                Template.instance().contributeHaveChecked.set(true);
                Template.instance().contributeHaveAmount.set(fields.type_have_amount);
                Template.instance().contributeHaveDescription.set(fields.type_have_description);
            }
            console.log('fields:');
            console.log(fields);
            return fields;
        } else {
            return undefined;
        }
    },
    'activityHasContributions': function () {
        var contributions = Template.instance().contributions.get('fields').types;
        return contributions.length > 0;
    },
    'currentUpperContribution': function () {
        return Contributions.find({ activity_id: this._id, upper_id: Meteor.user()._id });
    },
    'contributions': function () {
        return Contributions.find({ activity_id: this._id });
    },
    'showCanContribute': function () {
        return Template.instance().showCanContribute.get() ? true : false;
    },
    'showHaveContribute': function () {
        return Template.instance().showHaveContribute.get() ? true : false;
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
    userImage: function () {
        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({_id: user.profile.image});
        }
    }
});

// Initialize beginvalue variables
var beginFirst;
var beginLast;

Template.ActivityContribution.events({
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
    'mouseenter [data-open-contribution]': function mouseEnterContribution(event, template) {
        // this event handler does almost the same as the
        // click handler, except it's on hover and with a delay
        var booleanKey = $(event.currentTarget).data("open-contribution");

        // Temporarily save the begin values
        beginFirst = $(event.currentTarget).find('input[data-change-contribution]:first').val();
        beginLast = $(event.currentTarget).find('input[data-change-contribution]:last').val();

        if (!template[booleanKey].get()) {
            template.showTimeout = Meteor.setTimeout(function () {
                template[booleanKey].set(true);
            }, 1000);
        }
    },
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
    'click [data-check-contribution]': function checkContribution(event, template) {
        var valueKey = $(event.currentTarget).data("check-contribution");

        if (valueKey === 'contributeWantChecked') {
            // Submit form when user clicked the 'up for this' button
            $('#' + template.data._id).submit();
        }

        template[valueKey].set(!template[valueKey].get());
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
});

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            //var formNameParts = this.formId.split('-');
            //console.log(formNameParts);
            //if(formNameParts.length !== 2 || formNameParts[0] !== 'contributeForm') return;

            var activityId = this.formId;
            var self = this;
            var contribution = Contributions.findOne({ activity_id: activityId, upper_id: Meteor.user()._id });

            if (contribution) {
                console.log('update');
                var contributionId = contribution._id;
                Meteor.call('contributions.update', contributionId, insertDoc, function (error, updatedContribution) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contributions.set('fields', updatedContribution);
                });
            } else {
                console.log('insert');
                Meteor.call('contributions.insert', activityId, insertDoc, function (error, newContribution) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contributions.set('fields', newContribution);
                });
            }

            console.log(this.template.parent().contributions.get('fields'));

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
    });