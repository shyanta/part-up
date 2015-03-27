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
    'click [data-open-contribution-have]': function openContributionHave(event, template){
        event.preventDefault();
        var bool = template.showContributeHave.get()
        template.showContributeHave.set(!bool)
    },
    'mouseenter [data-open-contribution-have]': function mouseenterOpenContributionHave(event, template){
        template.showTimeout = Meteor.setTimeout(function(){
            template.showContributeHave.set(true);
        },1000);
    },
    'mouseleave [data-open-contribution-have]': function mouseleaveContributionHave(event, template){
        Meteor.clearTimeout(template.showTimeout);
    },
    'mouseleave [data-contribution-have]': function mouseleaveContributionHave(event, template){
        template.hideTimeout = Meteor.setTimeout(function(){
            template.showContributeHave.set(false);
        },1000);
    },
    'mouseenter [data-contribution-have]': function mouseenterContrinutionHave(event, template){
        Meteor.clearTimeout(template.hideTimeout);
    },
    'click [data-open-contribution-can]': function openContributionCan(event, template){
        event.preventDefault();
        var bool = template.showContributeCan.get()
        template.showContributeCan.set(!bool)
    },
    'mouseenter [data-open-contribution-can]': function mouseenterOpenContributionCan(event, template){
        template.showTimeout = Meteor.setTimeout(function(){
            template.showContributeCan.set(true);
        },1000);
    },
    'mouseleave [data-open-contribution-can]': function mouseleaveContributionCan(event, template){
        Meteor.clearTimeout(template.showTimeout);
    },
    'mouseleave [data-contribution-can]': function mouseleaveContributionCan(event, template){
        template.hideTimeout = Meteor.setTimeout(function(){
            template.showContributeCan.set(false);
        },1000);
    },
    'mouseenter [data-contribution-can]': function mouseenterContrinutionCan(event, template){
        Meteor.clearTimeout(template.hideTimeout);
    },
    'change [data-input-contribution-can]': function changeContrinutionCan(event, template){
        template.contributeCanValue.set(event.target.value);
    },
    // 'click .pu-button-contribute': function(event, template) {
    //     event.preventDefault();
    //     template.showContributeButton.set(false);
    // },
    // 'click .pu-button-save': function(event, template) {
    //     event.preventDefault();
    //     template.showContributeButton.set(true);
    // }
});

Template.ActivityContribution.created = function () {
    this.showContributeHave = new ReactiveVar(false);
    this.showContributeCan = new ReactiveVar(false);
    this.contributeCanValue = new ReactiveVar(0);
    //var activityId = this.activityId;
    //console.log(activityId);
};

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