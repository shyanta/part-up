Template.ActivityContribution.created = function () {
    this.contributions = new ReactiveDict();

    // contribute want init values
    this.contributeWantEnabled = new ReactiveVar(false);

    // contribute can init values
    this.contributeCanEnabled = new ReactiveVar(false);
    this.contributeCanAmount = new ReactiveVar(0);

    // contribute have init values
    this.contributeHaveEnabled = new ReactiveVar(false);
    this.contributeHaveAmount = new ReactiveVar(0);
    this.contributeHaveDescription = new ReactiveVar('');
};

Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribution,
    'placeholders': Partup.services.placeholders.startcontribute,
    'activityId': function () {
        return this._id;
    },
    'fieldsFromContribution': function () {
        var contribution = Contributions.findOne({activity_id: this._id, upper_id: Meteor.user()._id});
        if (contribution) {
            Template.instance().contributions.set('fields', contribution);
            var fields = Partup.transformers.contribution.toFormContribution(Template.instance().contributions.get('fields'));
            console.log('fields:');
            console.log(fields);
            return fields;
        } else {
            return undefined;
        }
    },
    'contribution': function () {
        //return Contributions.findOne({ activity_id: this._id, upper_id: Meteor.user()._id });
    },
    'contributeHaveEnabled': function () {
        return Template.instance().contributeHaveEnabled.get();
    },
    'contributeCanEnabled': function () {
        return Template.instance().contributeCanEnabled.get();
    },
    'contributionWantChecked': function () {
        return Template.instance().contributeWantEnabled.get() ? 'checked' : '';
    },
    'contributionCanChecked': function () {
        return (Template.instance().contributeCanAmount.get() > 0) ? 'checked' : '';
    },
    'contributionHaveChecked': function () {
        return ((Template.instance().contributeHaveAmount.get() > 0) || Template.instance().contributeHaveDescription.get()) ? 'checked' : '';
    },
    'contributions': function () {
        var want = Template.instance().contributeWantEnabled.get() ? true : false;
        var can = Template.instance().contributeCanAmount.get() ? true : false;
        var have = (Template.instance().contributeHaveAmount.get() || Template.instance().contributeHaveDescription.get()) ? true : false;
        return want || can || have;
    },
    'want': function () {
        return Template.instance().contributeWantEnabled.get() || false;
    },
    'can': function () {
        return Template.instance().contributeCanAmount.get() || false;
    },
    'have': function () {
        return {
            'value': Template.instance().contributeHaveAmount.get(),
            'extra': Template.instance().contributeHaveDescription.get()
        }
    },
    userImage: function () {
        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({_id: user.profile.image});
        }
    }
});

Template.ActivityContribution.events({
    'click [data-change-contribution]': function stopFromBubbling(event, template) {
        // prevent autofocus(clickContribution) on click
        event.stopPropagation();
    },
    'click [data-open-contribution]': function clickContribution(event, template) {
        // show the popover on click

        // prevent any form actions and checkbox selections
        event.preventDefault();

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
        if (!template[booleanKey].get()) {
            template.showTimeout = Meteor.setTimeout(function () {
                template[booleanKey].set(true);
            }, 1000);
        }
    },
    'mouseleave [data-open-contribution]': function mouseLeaveContribution(event, template) {
        // hide the popover on mouse leave

        // blur input fields to prevent accidental input change by user
        $(event.currentTarget).find('input[data-input-contribution]').blur();

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("open-contribution");

        // cancel any timeout that will show the current popover
        Meteor.clearTimeout(template.showTimeout);

        // set reactive var boolean to false to hide popover
        template[booleanKey].set(false);
    },
    'keyup [data-change-contribution]': function changeContrinution(event, template) {
        if (event.keyCode === 13) {
            // do something on return key
        } else {
            var valueKey = $(event.currentTarget).data("change-contribution");
            // console.log(valueKey,event.target.value)
            template[valueKey].set(event.target.value);
        }
    },
    'click [data-check-contribution]': function checkContribution(event, template) {
        var valueKey = $(event.currentTarget).data("check-contribution");
        template[valueKey].set(!template[valueKey].get());
    },
    'click [data-clear]': function clearContribution(event, template) {
        // reset field by data key
        var valueKey = $(event.currentTarget).data("clear");
        template[valueKey].set(false);

        // reset input associated with the data key
        var input = template.find('input[data-change-contribution=' + valueKey + ']');
        $(input).val('');
    }
});

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            console.log(this);
            console.log(this.formId);
            var activityId = this.formId;
            var self = this;
            var contribution = Contributions.findOne({activity_id: activityId, upper_id: Meteor.user()._id});

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

            console.log(this.template.parent().contributions.get());

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
    });