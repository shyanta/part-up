Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'placeholders': Partup.services.placeholders.startcontribute,
    'showContributeButton': function () {
        return Template.instance().showContributeButton.get();
    },
    'activityId': function() {
        return this._id;
    }
});

Template.ActivityContribution.events({
    'click .pu-button-contribute': function(event, template) {
        event.preventDefault();
        template.showContributeButton.set(false);
    }
    //'click .pu-button-save': function(event, template) {
        //event.preventDefault();
        //template.showContributeButton.set(true);
    //}
});

Template.ActivityContribution.created = function () {
    this.showContributeButton = new ReactiveVar(false);
    //var activityId = this.activityId;
    //console.log(activityId);
};

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var activityId = this.formId;
            var self = this;

            Meteor.call('activities.contributions.insert', activityId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }
                self.done();
            });

            return false;
        }
});