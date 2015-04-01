Template.ActivityContribution.created = function () {
    // contribute want init values
    this.contributeWantValue = new ReactiveVar(false);

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
        return (Template.instance().contributeHaveValue.get() > 0) ? 'checked' : '';
    },
    'contributions': function(){
        var want = Template.instance().contributeWantValue.get() ? true : false;
        var can = Template.instance().contributeCanValue.get() ? true : false;
        var have = (Template.instance().contributeHaveValue.get() || Template.instance().contributeHaveExtraValue.get()) ? true : false;
        return want || can || have;
    },
    'want': function(){
        return Template.instance().contributeWantValue.get() || false;
    },
    'can': function(){
        return Template.instance().contributeCanValue.get() || false;
    },
    'have': function(){
        return {
            'value':Template.instance().contributeHaveValue.get(),
            'extra':Template.instance().contributeHaveExtraValue.get()
        }
    },
    userImage: function () {
        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({ _id: user.profile.image });
        }
    }
});

Template.ActivityContribution.events({
    'click [data-change-contribution]': function stopFromBubbling(event, template){
        // prevent autofocus(clickContribution) on click
        event.stopPropagation();
    },
    'click [data-open-contribution]': function clickContribution(event, template){
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
    'keyup [data-change-contribution]': function changeContrinution(event, template){
        if(event.keyCode === 13){
            // do something on return key
        } else {
            var valueKey = $(event.currentTarget).data("change-contribution");
            console.log(valueKey,event.target.value)
            template[valueKey].set(event.target.value);
        }
    },
    'change [data-check-contribution]': function checkContribution(event, template){
        var valueKey = $(event.currentTarget).data("check-contribution");
        template[valueKey].set(event.target.checked);
    },
    'click [data-clear]': function clearContribution(event, template){
        // reset field by data key
        var valueKey = $(event.currentTarget).data("clear");
        template[valueKey].set(false);

        // reset input associated with the data key
        var input = template.find('input[data-change-contribution='+valueKey+']');
        $(input).val('');
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