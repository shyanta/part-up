Template.ActivityContribution.created = function () {
    this.showContributeHave = new ReactiveVar(false);
    this.showContributeCan = new ReactiveVar(false);
    this.contributeCanValue = new ReactiveVar(0);
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
    }
});

Template.ActivityContribution.events({
    'click [data-click-contribution]': function clickContribution(event, template){
        // show the popover on click

        // prevent any form actions and checkbox selections
        event.preventDefault();

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("click-contribution");

        // set reactive var boolean to true to open popover
        template[booleanKey].set(true)
    },
    'mouseenter [data-hover-contribution]': function hoverContribution(event, template){
        // this event handler does almost the same as the 
        // click handler, except it's on hover and with a delay
        var booleanKey = $(event.currentTarget).data("hover-contribution");
        if(!template[booleanKey].get()){
            template.showTimeout = Meteor.setTimeout(function(){
                template[booleanKey].set(true);
            },1000);
        }
    },
    'mouseleave [data-hover-contribution]': function mouseleaveContributionCan(event, template){
        // hide the popover on mouse leave

        // get the key for the boolean wich is associated with this field
        var booleanKey = $(event.currentTarget).data("hover-contribution");

        // cancel any timeout that will show the current popover
        Meteor.clearTimeout(template.showTimeout);

        // set reactive var boolean to false to hide popover
        template[booleanKey].set(false);
    },
    'change [data-input-contribution-can]': function changeContrinutionCan(event, template){
        template.contributeCanValue.set(event.target.value);
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