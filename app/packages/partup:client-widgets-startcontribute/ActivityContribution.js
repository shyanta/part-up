/*************************************************************/
/* Widget initial */
/*************************************************************/
var ACTIVITY_FORM_ID_PREFIX = 'contributionEditForm-';


/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.ActivityContribution.onRendered(function() {

    // Compose unique popover keys
    var activityId = this.data._id;
    this.canPopoverToggleBool = 'widget-activity-popover-can-' + activityId;
    this.havePopoverToggleBool = 'widget-activity-popover-have-' + activityId;

    // Set default boolean values    
    Session.set(this.canPopoverToggleBool, false);
    Session.set(this.havePopoverToggleBool, false);

    // Add click-outside handlers
    // var formId = ACTIVITY_FORM_ID_PREFIX + this.data._id;
    // Template.autoForm.onRendered(function() {
    //     debugger;
    //     if(this.data.id !== formId) return;
    //     Partup.ui.ClientWidgetsDropdowns.addOutsideDropdownClickHandler(self, '[data-popover=can]', '[data-toggle-popover=can]', 'canPopoverToggleBool');
    //     Partup.ui.ClientWidgetsDropdowns.addOutsideDropdownClickHandler(self, '[data-popover=have]', '[data-toggle-popover=have]', 'havePopoverToggleBool');
    // });
});


/*************************************************************/
/* Widget destroyed */
/*************************************************************/
Template.ActivityContribution.onDestroyed(function() {

    // Set default boolean values    
    Session.set(this.canPopoverToggleBool, false);
    Session.set(this.havePopoverToggleBool, false);

    // Add click-outside handlers
    // Partup.ui.ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
});


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

        return Partup.transformers.contribution.toFormContribution(contribution);
    },
    popoverEnabled: function (type) {
        var activityId = this._id;
        return Session.get('widget-activity-popover-' + type + '-' + activityId);
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
        var type = event.currentTarget.getAttribute('data-toggle-popover');
        var popoverKey = type + 'PopoverToggleBool';
        var newPopoverState = Partup.ui.ClientWidgetsDropdowns.customDropdownSwitch(template, popoverKey); // trigger dropdown-click-handler

        var form = template.find('#' + ACTIVITY_FORM_ID_PREFIX + template.data._id); // get form
        if(newPopoverState) {
            form.elements['types_' + type + '_amount'].focus();      // focus first field

            if(type === 'can') {
                Session.set(template.havePopoverToggleBool, false);
            } else if(type === 'have') {
                Session.set(template.canPopoverToggleBool, false);
            }
        }
    },
});

AutoForm.addHooks(null, {
    onSubmit: function (doc) {
        var self = this;
        self.event.preventDefault();

        // Get activityId
        if(self.formId.indexOf(ACTIVITY_FORM_ID_PREFIX) === -1) return;
        var activityId = self.formId.replace(ACTIVITY_FORM_ID_PREFIX, '');

        // Get upperId
        var user = Meteor.user();
        if(!user) return;
        var upperId = user._id;

        // Submit contribution
        Meteor.call('activity.contribution.update', activityId, doc, function (error, updatedContribution) {
            if (error) {
                Partup.ui.notify.iError(error.reason);
                self.done(new Error(error.message));
                return;
            }

            self.done();
        });

        // Prevent default
        return false;
    }
});