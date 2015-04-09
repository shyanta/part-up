/*************************************************************/
/* Widget initial */
/*************************************************************/
var ACTIVITY_FORM_ID_PREFIX = 'contributionEditForm-';
var popoverEnabled = new ReactiveVar(false);


/*************************************************************/
/* Widget functions */
/*************************************************************/
var getCurrentUserContribution = function(activityId) {
    var user = Meteor.user();
    if(!user) return;

    return Contributions.findOne({activity_id: activityId, upper_id: user._id});
};

var submitForm = function (event, template) {
    var form = template.find('#' + ACTIVITY_FORM_ID_PREFIX + template.data._id); // get form
    $(form).submit();                                                            // trigger form submit
};


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.ActivityContribution.helpers({

    /******************************/
    /* User contribution controls */
    /******************************/
    formSchema: Partup.schemas.forms.contribution,
    placeholders: Partup.services.placeholders.startcontribute,
    activityFormId: function () {
        return ACTIVITY_FORM_ID_PREFIX + this._id;
    },
    fieldsFromContribution: function () {
        var contribution = getCurrentUserContribution(this._id);
        if(!contribution) return;

        var fields = Partup.transformers.contribution.toFormContribution(contribution);
        console.log('fields', fields);
        return fields;
    },
    popoverEnabled: function (type) {
        var activityId = this._id;
        return popoverEnabled.get() === activityId + '-' + type;
    },
    userWantEnabled: function () {
        var activityId = this._id;
        var contribution = getCurrentUserContribution(activityId);
        return contribution && contribution.types.want.enabled;
    },
    userCanEnabled: function () {
        var activityId = this._id;
        var contribution = getCurrentUserContribution(activityId);
        return contribution && contribution.types.can.amount;
    },
    userHaveEnabled: function () {
        var activityId = this._id;
        var contribution = getCurrentUserContribution(activityId);
        return contribution && (contribution.types.have.amount || contribution.types.have.description);
    },

    /*********************/
    /* All contributions */
    /*********************/
    contributions: function () {
        var activityId = this._id;
        return Contributions.find({ activity_id: activityId });
    },
    userImage: function () {
        var user = Meteor.users.findOne(this.upper_id);
        if (user && user.profile && user.profile.image) {
            return Images.findOne({_id: user.profile.image});
        }
    },
    contributionCanEnabled: function () {
        return this && this.types.can.amount;
    },
    contributionHaveEnabled: function () {
        return this && (this.types.have.amount || this.types.have.description);
    }
});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.ActivityContribution.events({

    // Submit form on toggle want field
    'click [data-want-toggle]': function (event, template) {
        var form = template.find('#' + ACTIVITY_FORM_ID_PREFIX + template.data._id);          // get form
        form.elements.types_want_enabled.checked = !form.elements.types_want_enabled.checked; // switch toggle
        $(form).submit();                                                                     // trigger form submit
    },

    // Submit form on input field keyup
    'keyup [data-schema-key=types_can_amount]': submitForm,
    'keyup [data-schema-key=types_have_amount]': submitForm,
    'keyup [data-schema-key=types_have_description]': submitForm,

    // Empty field button handler
    'click [data-empty-field]': function (event, template) {
        var form = template.find('#' + ACTIVITY_FORM_ID_PREFIX + template.data._id);   // get form
        var fieldName = event.currentTarget.getAttribute('data-empty-field'); // get fieldname to empty
        form.elements[fieldName].value = '';                                  // empty field
        $(form).submit();
    },

    // Open popover and focus on first field
    'click [data-toggle-popover]': function (event, template) {
        var popoverKey = template.data._id + '-' + event.currentTarget.getAttribute('data-toggle-popover'); // generate popover key for this popover
        var popoverState = popoverEnabled.get() === popoverKey,                      // find popover state for this popover
            newPopoverState;
        if(popoverState) newPopoverState = false;                                    // turn off this popover
        else             newPopoverState = popoverKey;                               // turn on this popover
        popoverEnabled.set(newPopoverState);

        var form = template.find('#' + ACTIVITY_FORM_ID_PREFIX + template.data._id); // get form
        if(newPopoverState) form.elements.types_can_amount.focus();                  // focus first field
    },
});

AutoForm.addHooks(null, {
    onSubmit: function (doc) {
        var self = this;
        self.event.preventDefault();
        console.log('submit start');

        // Get activityId
        if(self.formId.indexOf(ACTIVITY_FORM_ID_PREFIX) === -1) return;
        var activityId = self.formId.replace(ACTIVITY_FORM_ID_PREFIX, '');
        console.log('submit activity id', activityId);

        // Get upperId
        var user = Meteor.user();
        if(!user) return;
        var upperId = user._id;
        console.log('submit upper id', upperId);

        // Find contribution by activityId
        var contribution = Contributions.findOne({ activity_id: activityId, upper_id: upperId });
        console.log('submit contribution', contribution);

        // Contribution exists, so update
        if (contribution) {
            var contributionId = contribution._id;
            console.log('submit contribution updating', doc);
            Meteor.call('contributions.update', contributionId, doc, function (error, updatedContribution) {
                if (error) {
                    Partup.ui.notify.iError(error.reason);
                    self.done(new Error(error.message));
                    return;
                }

                self.done();
            });

        // Contribution doesn't exist, so insert
        } else {
            console.log('submit contribution inserting', doc);
            Meteor.call('contributions.insert', activityId, doc, function (error, newContribution) {
                if (error) {
                    Partup.ui.notify.iError(error.reason);
                    self.done(new Error(error.message));
                    return;
                }

                self.done();
            });
        }

        // Prevent default
        return false;
    }
});