Template.ActivityContribution.created = function () {

    // contribute can init values
    this.showContributeCan = new ReactiveVar(false);
    this.contributeCanValue = new ReactiveVar(0);

    // contribute have init values
    this.showContributeHave = new ReactiveVar(false);
    this.contributeHaveValue = new ReactiveVar(0);
    this.contributeHaveExtraValue = new ReactiveVar("");
};

Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'showContributeButton': function () {
        return Template.instance().showContributeButton.get();
    },
    'activityId': function() {
        return this._id;
    },
    'showContributeHave': function(){
        return Template.instance().showContributeHave.get();
    },
    'showContributeCan': function(){
        return Template.instance().showContributeCan.get();
    },
    'contributionCanChecked': function(){
        return (Template.instance().contributeCanValue.get() > 0) ? 'checked' : '';
    },
    'contributionHaveChecked': function(){
        return (Template.instance().contributeCanValue.get() > 0) ? 'checked' : '';
    }
});

Template.ActivityContribution.events({
    'click [data-open-contribution]': function clickContribution(event, template){
        // show the popover on click

        // prevent any form actions and checkbox selections
        event.preventDefault();

        // focus on the first input field
        $(event.currentTarget).find('input[data-input-contribution]:first').focus();

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("open-contribution");

        // set reactive var boolean to true to open popover
        template[booleanKey].set(true)
    },
    'mouseenter [data-open-contribution]': function mouseEnterContribution(event, template){
        // this event handler does almost the same as the 
        // click handler, except it's on hover and with a delay
        var booleanKey = $(event.currentTarget).data("open-contribution");
        if(!template[booleanKey].get()){
            template.showTimeout = Meteor.setTimeout(function(){
                template[booleanKey].set(true);
            },1000);
        }
    },
    'mouseleave [data-open-contribution]': function mouseLeaveContribution(event, template){
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
    'keyup [data-input-contribution]': function changeContrinutionCan(event, template){
        var valueKey = $(event.currentTarget).data("input-contribution");
        console.log(valueKey,event.target.value)
        template[valueKey].set(event.target.value);
    }
});

AutoForm.hooks({
    null: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            console.log(this.formId);
            console.log(this.template.activityId);
            var activityId = Session.get('partials.start-partup.current-partup');
            var self = this;

            Meteor.call('activities.contribution.insert', partupId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }
                self.template.showContributeButton.set(true);
                self.done();
            });

            return false;
        }
    }
});